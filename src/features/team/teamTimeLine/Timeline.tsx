import {FC, ReactElement} from 'react';
import {PiStarFourDuotone} from "react-icons/pi";
import SenseIcon from "../../../ui/SenseIcon.tsx";

const Timeline: FC<{
    positionArray: number[],
    length: number,
    extraLight: Record<SenseType | 'SP', number>,
    startLight: Record<SenseType | 'SP', number>,
    senseType: SenseType,
    failedPositionArray: number[],
    ct?: number,
}> = ({
          positionArray, length, extraLight, startLight, senseType, ct = 0, failedPositionArray,
      }) => {

    let color: string;

    switch (senseType) {
        case "Support": {
            color = 'limegreen';
            break;
        }
        case "Amplification": {
            color = 'gold';
            break;
        }
        case "Special": {
            color = '#3498DB';
            break;
        }
        case "Control": {
            color = '#FF3838';
            break;
        }
        default: {
            color = 'gray';
        }
    }

    const extraLightIcons: ReactElement[] = [];
    const startLightIcons: ReactElement[] = [];

    for (const extraLightType in extraLight) {
        for (let i = 0; i < extraLight[extraLightType as SenseType | 'SP']; i++) {
            extraLightIcons.push(
                <div key={extraLightType + i} className={'-my-0.5'}>
                    <SenseIcon senseType={extraLightType as SenseType | 'SP'} />
                </div>);
        }
    }

    for (const startLightType in startLight) {
        for (let i = 0; i < startLight[startLightType as SenseType | 'SP']; i++) {
            startLightIcons.push(
                <div key={startLightType + i} className={'-my-0.5'}>
                    <SenseIcon senseType={startLightType as SenseType | 'SP'} />
                </div>);
        }
    }

    return (
        <div className={'h-[88px] first:h-[84px] last:h-[84px] border-y-[1px] first:border-t-2 last:border-b-2 border-stone-400 relative z-50'}>
            <div
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    height: '84px',
                    width: 'auto',
                    transform: 'translateX(-50%)',
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {startLightIcons}
            </div>
            <div className={'absolute'}>
                {ct > 0 ? ct : 0}s
            </div>
            {positionArray.map(
                position => {
                    const isFailed = failedPositionArray.includes(position);

                    // calculate percent， keeping 2 decimal places
                    const percent = Math.round(position / length * 10000) / 100;

                    return (
                        <div
                            style={{
                                position: "absolute",
                                left: `${percent}%`,
                                top: '10%',
                                transform: 'translateX(-25px)',
                            }}
                            key={position}
                        >
                            <div className={'relative flex flex-col items-center'}>
                                <PiStarFourDuotone size={50} color={color} />
                                {isFailed && (
                                    <div
                                        style={{
                                            width: '50px',
                                            height: '7px',
                                            backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                            transform: 'translate(-50%, -50%) rotate(-45deg)',
                                            position: 'absolute',
                                            top: '25px',
                                            left: '50%',
                                            transformOrigin: 'center',
                                        }}
                                    >
                                    </div>
                                )}
                                <div className={'flex flex-col items-center -mt-0.5'}>
                                    {extraLightIcons}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '25px',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontWeight: 'bold',
                                    }}
                                    className={'text-stone-700 text-sm'}
                                >
                                    {position}
                                </div>
                            </div>
                        </div>
                    );
                },
            )}
        </div>
    );
};

export default Timeline;