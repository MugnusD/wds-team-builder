import {FC} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";
import {useSelector} from "react-redux";
import {
    selectCardAttributeTypeFilterArray,
    selectCardNameFilterArray,
    selectCardRarityFilterArray,
    selectCardSenseTypeFilterArray,
    selectCardSortAndFilter,
} from "../selectTabsSlice.ts";
import {CharacterNameOrder} from "../../../types/characterName.ts";

const CharacterTabsContent: FC = () => {
    const {characters, isLoading, isError} = useCharacters();
    const {sortBy} = useSelector(selectCardSortAndFilter);
    const filteredNames = useSelector(selectCardNameFilterArray);
    const filteredRarities = useSelector(selectCardRarityFilterArray);
    const filteredSenseType = useSelector(selectCardSenseTypeFilterArray);
    const filteredAttributeType = useSelector(selectCardAttributeTypeFilterArray);

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

    // filtered by name
    items = items.filter(character => filteredNames.includes(character.characterBase));

    // filtered by rarity
    items = items.filter(characters => filteredRarities.includes(characters.rarity));

    // filtered by senseType
    items = items.filter(characters => filteredSenseType.includes(characters.sense.type));

    // filtered by attributeType
    items = items.filter(characters => filteredAttributeType.includes(characters.attribute));

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
        </>
    );
};

export default CharacterTabsContent;