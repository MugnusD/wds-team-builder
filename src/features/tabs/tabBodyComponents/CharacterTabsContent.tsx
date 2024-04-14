import {FC} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";
import {useSelector} from "react-redux";
import {
    selectCardAttributeTypeFilterArray,
    selectCardNameFilterArray,
    selectCardRarityFilterArray,
    selectCardSenseTypeFilterArray,
    selectCardSortAndFilter
} from "../selectTabsSlice.ts";

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

    // sorted by id first
    let items = characters.sort((a, b) => {
        return b.id - a.id;
    });

    // sorted by option next
    switch (sortBy) {
        case "rarity": {
            items.sort((a,b) => {
                const aRarity = Number(a.rarity[4]);
                const bRarity = Number(b.rarity[4]);
                return bRarity - aRarity;
            });
            break;
        }
        case "time": {
            items.sort((a, b) => b.displayStartAt.getTime() - a.displayStartAt.getTime()
            );
            break;
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
                <GameItem id={item.id} key={item.id} type={'character'} characterBase={item.characterBase} attribute={item.attribute} sense={item.sense.type} rarity={item.rarity}/>
            ))}
        </>
    )
}

export default CharacterTabsContent;