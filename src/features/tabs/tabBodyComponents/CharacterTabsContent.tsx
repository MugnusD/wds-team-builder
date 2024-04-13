import {FC} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";
import {useSelector} from "react-redux";
import {selectCardNameFilterArray, selectCardRarityFilterArray, selectSortAndFilter} from "../selectTabsSlice.ts";

const CharacterTabsContent: FC = () => {
    const {characters, isLoading, isError} = useCharacters();
    const {sortBy} = useSelector(selectSortAndFilter);
    const filteredNames = useSelector(selectCardNameFilterArray);
    const filterRarities = useSelector(selectCardRarityFilterArray);

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
    items = items.filter(characters => filterRarities.includes(characters.rarity));

    // Finally mapped to GameItem props type
    const renderItems = items.map(character => ({
        id: character.id,
        characterBase: character.characterBase,
    }));

    return (
        <>
            {renderItems.map(item => (
                <GameItem id={item.id} key={item.id} type={'character'} characterBase={item.characterBase} />
            ))}
        </>
    )
}

export default CharacterTabsContent;