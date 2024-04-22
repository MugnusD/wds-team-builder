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

const CharacterTabsContent: FC = () => {
    const {characters, isLoading, isError} = useCharacters();
    const {
              sortBy, filterByCharacter, filterByRarity, filterByAttributeType, filterBySenseType,
          } = useSelector(selectCardSortAndFilter);

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

    // filtered
    items = items.filter(character => filterByCharacter[character.characterBase]);
    items = items.filter(character => filterByRarity[character.rarity]);
    items = items.filter(character => filterBySenseType[character.sense.type]);
    items = items.filter(character => filterByAttributeType[character.attribute]);

    return (
        <>
            {items.map(item => (
                <GameItem
                    id={item.id}
                    key={item.id}
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
                                    <div className={'*:inline-block'}>
                                        {support.bloom} <SenseIcon senseType={'Support'} />
                                        {control.bloom} <SenseIcon senseType={'Control'} />
                                        {amplification.bloom} <SenseIcon senseType={'Amplification'} />
                                        {special.bloom} <SenseIcon senseType={'Special'} />
                                    </div>
                                    <div>
                                        {item.sense.descriptionsChinese}
                                    </div>
                                </div>
                                <div>
                                    CT: {item.sense.coolTime.origin}/{item.sense.coolTime.bloom}
                                </div>
                            </div>
                        );
                    }}
                />
            ))}
            <div>
                Count: {items.length}
            </div>
        </>
    );
};

export default CharacterTabsContent;