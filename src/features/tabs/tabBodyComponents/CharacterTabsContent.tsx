import {FC} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";
import {useSelector} from "react-redux";
import {
    selectCardSortAndFilter,
} from "../selectTabsSlice.ts";
import {CharacterNameOrder} from "../../../types/character/characterName.ts";
import SenseIcon from "../../../ui/SenseIcon.tsx";
import {Typography} from "@material-tailwind/react";
import clsx from "clsx";
import {selectTeamedCharacterIds} from "../../team/teamSlice.ts";

const CharacterTabsContent: FC<{ display?: boolean }> = ({display = true}) => {
    const {characters, isLoading, isError} = useCharacters();
    const {
              sortBy,
              filterByCharacter,
              filterByRarity,
              filterByAttributeType,
              filterBySenseType,
          } = useSelector(selectCardSortAndFilter);
    const teamedIds = useSelector(selectTeamedCharacterIds);

    if (isLoading || isError || !characters) {
        return null;
    }

    let items: CharacterDetail[] = characters;

    // sorted by option next
    switch (sortBy) {
        case "rarity": {
            items.sort((a, b) => {
                const aRarity = Number(a.rarity[4]);
                const bRarity = Number(b.rarity[4]);
                return bRarity - aRarity;
            });
            break;
        }
        case "time": {
            items.sort((a, b) =>
                b.displayStartAt.getTime() - a.displayStartAt.getTime());
            break;
        }
        case 'name': {
            items.sort((a, b) =>
                CharacterNameOrder[a.characterBase] - CharacterNameOrder[b.characterBase],
            );
            break;
        }
        case "rarityAndTime": {
            items.sort((a, b) => {
                const rarityComp = Number(b.rarity[4]) - Number(a.rarity[4]);
                if (rarityComp !== 0) {
                    return rarityComp;
                } else {
                    return b.displayStartAt.getTime() - a.displayStartAt.getTime();
                }
            });
            break;
        }
    }

    // Teamed items always on the top
    items.sort((a, b) => {
        const indexA = teamedIds.indexOf(a.id);
        const indexB = teamedIds.indexOf(b.id);

        if (indexA !== indexB) {
            if (indexA === -1) {
                return 1;
            }
            if (indexB === -1) {
                return -1;
            }

            return indexA - indexB;
        }

        return 0;
    });

    // filtered
    items = items.filter(character => filterByCharacter[character.characterBase]);
    items = items.filter(character => filterByRarity[character.rarity]);
    items = items.filter(character => filterBySenseType[character.sense.type]);
    items = items.filter(character => filterByAttributeType[character.attribute]);

    return (
        <>
            {items.map(item => (
                <div
                    className={clsx(!display && 'hidden', teamedIds.includes(item.id) && 'ring-4 ring-red-500 rounded-xl')}
                    key={item.id}
                >
                    <GameItem
                        id={item.id}
                        characterBase={item.characterBase}
                        detail={{
                            type: 'character', attribute: item.attribute, rarity: item.rarity, sense: item.sense.type,
                        }}
                        render={() => {
                            const [, support, control, amplification, special] = item.starAct.conditions;

                            return (
                                <div className={'flex flex-col gap-2 divide-y divide-blue-gray-200 *:pt-2'}>
                                    <div>
                                        <Typography variant={'h5'}>
                                            {item.name}
                                        </Typography>
                                    </div>
                                    <div>
                                        <div className={'*:inline-block flex flex-row items-center gap-0.5'}>
                                            <div className={'select-none'}>{support.bloom}</div>
                                            <SenseIcon senseType={'Support'} />
                                            <div className={'select-none'}>{control.bloom}</div>
                                            <SenseIcon senseType={'Control'} />
                                            <div className={'select-none'}>{amplification.bloom}</div>
                                            <SenseIcon senseType={'Amplification'} />
                                            <div className={'select-none'}>{special.bloom}</div>
                                            <SenseIcon senseType={'Special'} />
                                        </div>
                                        <div>
                                            {item.starAct.descriptionsChinese.join('。')}
                                        </div>
                                    </div>
                                    <div>
                                        Sense: {item.sense.descriptionsChinese}<br />
                                        CT: {item.sense.coolTime.origin}/{item.sense.coolTime.bloom}
                                    </div>
                                    <div>
                                        <Typography variant={'small'} color={'gray'} className={'-mt-2'}>
                                            点击头像也可以打开和关闭悬浮窗
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
            ))}
            <div className={clsx(!display && 'hidden')}>
                Count: {items.length}
            </div>
        </>
    );
};

export default CharacterTabsContent;