import {FC} from 'react';
import Timeline from "./Timeline.tsx";
import useCurrentTeamContext from "../useCurrentTeamContext.ts";
import {selectLeaderIndex, SlotIndex} from "../teamSlice.ts";
import {useSelector} from "react-redux";
import GradientLine from "./GradientLine.tsx";
import {selectLength, selectSensePosition} from "./timelineSlice.ts";

const typeMapping: Record<string, SenseType | 'SP'> = {
    '特殊系的': 'Special',
    '支援系的': 'Support',
    '支配系的': 'Control',
    '增幅系的': 'Amplification',
    'SP': 'SP',
};

const TeamTimelines: FC = () => {
    const context = useCurrentTeamContext();
    const {isLoading, isError} = context;

    const defaultExtraLight: Record<SenseType | 'SP', number> = {
        'Support': 0,
        'Amplification': 0,
        'Special': 0,
        'Control': 0,
        'None': 0,
        'Alternative': 0,
        'SP': 0,
    };

    const sensePosition: { index: SlotIndex | -1, time: number }[] = useSelector(selectSensePosition);
    const length = useSelector(selectLength);

    const lightArray: SenseType[] = [];
    const ctArray: number[] = [];

    const startLightArray = Array.from({length: 5}, () => ({...defaultExtraLight}));
    const extraLightArray = Array.from({length: 5}, () => ({...defaultExtraLight}));

    const szkIndex = [context["0"], context["1"], context["2"], context["3"], context["4"]].findIndex(_ => _.characterDetail?.characterBase === '静香');
    const kknIndex = [context["0"], context["1"], context["2"], context["3"], context["4"]].findIndex(_ => _.characterDetail?.characterBase === '鳳ここな');

    if (!isError && !isLoading) {
        [0, 1, 2, 3, 4].forEach(index => {
            const {posterDetail, accessoryDetail, characterDetail} = context[index as SlotIndex];

            const characterSenseType = characterDetail?.sense.type ?? 'None';
            lightArray.push(characterSenseType);

            if (characterDetail?.sense.lightCount && characterDetail?.sense.lightCount > 1) {
                extraLightArray[index][characterSenseType] += 1;
            }

            const characterCt = characterDetail?.sense.coolTime.bloom ?? 0;
            ctArray.push(characterCt - 1);

            const posterAbilityArray = posterDetail?.abilities.map(_ => _.descriptionChinese);
            const accessoryAbilityArray = [...accessoryDetail?.effects.map(_ => _.descriptionChinese) ?? [], ...accessoryDetail?.randomEffects.map(_ => _.descriptionChinese) ?? []];

            if (posterDetail?.id === 230210) {
                if (characterDetail?.characterBase === '連尺野初魅') {
                    startLightArray[index].Support += 1;
                    extraLightArray[index][characterSenseType] += 1;
                } else if (characterDetail?.characterBase === '千寿暦') {
                    startLightArray[index].Special += 1;
                    extraLightArray[index][characterSenseType] += 1;
                }
            } else if (posterAbilityArray) {
                const startRegex = /给予(.*)个(.*)光/;
                const extraRegex = /Sense所给予的「光」给予数量增加1个/;
                const ctRegex = /自身Sense的CT缩短(.*)~(.*)秒/;

                posterAbilityArray.forEach(ability => {
                    const startResult = startRegex.exec(ability);
                    const extraResult = extraRegex.exec(ability);
                    const ctResult = ctRegex.exec(ability);

                    if (startResult) {
                        const type: SenseType | 'SP' = typeMapping[startResult[2]] ?? 'None';
                        let count: number;

                        switch (startResult[1]) {
                            case '1~2': {
                                count = 2;
                                break;
                            }
                            case  '1': {
                                count = 1;
                                break;
                            }
                            default: {
                                count = 0;
                            }
                        }

                        startLightArray[index][type] += count;
                    }

                    if (extraResult) {
                        extraLightArray[index][characterSenseType] += 1;
                    }

                    if (ctResult) {
                        ctArray[index] -= Number(ctResult[2]);
                    }
                });
            }

            if (accessoryAbilityArray) {
                const extraRegex = /在Sense发动给予光时，追加给予1个同系统的光/;
                const ctRegex = /自身的Sense的CT减少/;

                accessoryAbilityArray.forEach(ability => {
                    if (extraRegex.test(ability)) {
                        extraLightArray[index][characterSenseType] += 1;
                    }

                    if (ctRegex.test(ability)) {
                        ctArray[index] -= 3;
                    }
                });
            }

            if (accessoryDetail?.id === 330170) {
                startLightArray[index]['SP'] += 3;
            }
        });
    }

    const leaderIndex = useSelector(selectLeaderIndex);
    const leaderCondition = context[leaderIndex as SlotIndex].characterDetail?.starAct.conditions;
    const saTime: number[] = [];

    const senseReadyTime: number[] = [0, 0, 0, 0, 0];
    const failedSenseTime: number[] = [];

    if (szkIndex !== -1 && kknIndex !== -1) {
        lightArray[szkIndex] = lightArray[kknIndex];
        extraLightArray[szkIndex] = extraLightArray[kknIndex];
    }

    if (leaderCondition) {
        sensePosition
            .sort((a, b) => a.time - b.time)
            .reduce((acc: {
                Support: number,
                Amplification: number,
                Special: number,
                Control: number,
                SP: number
            }, {index: index, time}) => {
                if (index === -1) {
                    startLightArray.forEach(startLight => {
                        acc.Support += startLight.Support;
                        acc.Amplification += startLight.Amplification;
                        acc.Special += startLight.Special;
                        acc.Control += startLight.Control;
                        acc.SP += startLight.SP;
                    });
                } else {
                    const extraLight = extraLightArray[index];

                    acc.Support += extraLight.Support;
                    acc.Amplification += extraLight.Amplification;
                    acc.Special += extraLight.Special;
                    acc.Control += extraLight.Control;

                    const senseLight = lightArray[index];
                    switch (senseLight) {
                        case 'Support': {
                            acc.Support += 1;
                            break;
                        }
                        case 'Amplification': {
                            acc.Amplification += 1;
                            break;
                        }
                        case 'Special': {
                            acc.Special += 1;
                            break;
                        }
                        case 'Control': {
                            acc.Control += 1;
                            break;
                        }
                    }
                }

                if (time < senseReadyTime[index] || (index === szkIndex && time < senseReadyTime[kknIndex])) {
                    failedSenseTime.push(time);

                    return {
                        'Support': 0,
                        'Amplification': 0,
                        'Special': 0,
                        'Control': 0,
                        'SP': 0,
                    };
                }

                if (index !== szkIndex) {
                    senseReadyTime[index] = time + ctArray[index];
                }

                let missingLight: number = 0;

                missingLight += leaderCondition[1].bloom - acc.Support > 0 ? leaderCondition[1].bloom - acc.Support : 0;
                missingLight += leaderCondition[2].bloom - acc.Control > 0 ? leaderCondition[2].bloom - acc.Control : 0;
                missingLight += leaderCondition[3].bloom - acc.Amplification > 0 ? leaderCondition[3].bloom - acc.Amplification : 0;
                missingLight += leaderCondition[4].bloom - acc.Special > 0 ? leaderCondition[4].bloom - acc.Special : 0;

                if (missingLight <= acc.SP) {
                    saTime.push(time);
                    return {
                        'Support': 0,
                        'Amplification': 0,
                        'Special': 0,
                        'Control': 0,
                        'SP': 0,
                    };
                } else {
                    return acc;
                }
            }, {
                'Support': 0,
                'Amplification': 0,
                'Special': 0,
                'Control': 0,
                'SP': 0,
            });
    }

    return (
        <div className={'w-full h-full grow flex flex-col ml-10 relative'}>
            <Timeline
                length={length}
                positionArray={sensePosition.filter(pos => pos.index === 0).map(_ => _.time)}
                startLight={startLightArray[0]}
                extraLight={extraLightArray[0]}
                senseType={lightArray[0]}
                ct={ctArray[0]}
                failedPositionArray={failedSenseTime}
            />
            <Timeline
                length={length}
                positionArray={sensePosition.filter(pos => pos.index === 1).map(_ => _.time)}
                startLight={startLightArray[1]}
                extraLight={extraLightArray[1]}
                senseType={lightArray[1]}
                ct={ctArray[1]}
                failedPositionArray={failedSenseTime}
            />
            <Timeline
                length={length}
                positionArray={sensePosition.filter(pos => pos.index === 2).map(_ => _.time)}
                startLight={startLightArray[2]}
                extraLight={extraLightArray[2]}
                senseType={lightArray[2]}
                ct={ctArray[2]}
                failedPositionArray={failedSenseTime}
            />
            <Timeline
                length={length}
                positionArray={sensePosition.filter(pos => pos.index === 3).map(_ => _.time)}
                startLight={startLightArray[3]}
                extraLight={extraLightArray[3]}
                senseType={lightArray[3]}
                ct={ctArray[3]}
                failedPositionArray={failedSenseTime}
            />
            <Timeline
                length={length}
                positionArray={sensePosition.filter(pos => pos.index === 4).map(_ => _.time)}
                startLight={startLightArray[4]}
                extraLight={extraLightArray[4]}
                senseType={lightArray[4]}
                ct={ctArray[4]}
                failedPositionArray={failedSenseTime}
            />
            {saTime?.map(time => (
                <GradientLine position={time} length={length} key={time} />
            ))}
            {/*<GradientLine position={50} length={100} />*/}
        </div>
    );
};

export default TeamTimelines;