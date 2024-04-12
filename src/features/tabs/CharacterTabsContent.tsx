import {FC} from 'react';
import useCharacters from "../../hooks/useCharacters.ts";
import GameItem from "./GameItem.tsx";

const CharacterTabsContent: FC = () => {
    const {characters, isLoading, isError} = useCharacters();

    if (isLoading || isError || !characters) {
        return null;
    }

    const renderItems = characters.map(character => ({
        id: character.id,
        characterBase: character.characterBase,
    }))

    return (
        <>
            {renderItems.map(item => (
                <GameItem id={item.id} key={item.id} type={'character'} characterBase={item.characterBase}/>
            ))}
        </>
    )
}

export default CharacterTabsContent;