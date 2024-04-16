import {FC} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";
import {useSelector} from "react-redux";
import {
    selectCardSortAndFilter,
} from "../selectTabsSlice.ts";
import {CharacterNameOrder} from "../../../types/characterName.ts";

const CharacterTabsContent: FC = () => {
    const {characters, isLoading, isError} = useCharacters();
    const {sortBy, filterByCharacter, filterByRarity, filterByAttributeType, filterBySenseType} = useSelector(selectCardSortAndFilter);

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
                />
            ))}
            <div>
                Count: {items.length}
            </div>
        </>
    );
};

export default CharacterTabsContent;