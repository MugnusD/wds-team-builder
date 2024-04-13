import {FC} from 'react';
import GameItem from "./GameItem.tsx";
import usePosters from "../../../hooks/usePosters.ts";

const PosterTabsContent: FC = () => {
    const {posters, isLoading, isError} = usePosters();

    if (isLoading || isError || !posters) {
        return null;
    }

    const renderItems = posters.map(poster => ({
        id: poster.id,
    }))

    return (
        <>
            {renderItems.map(item => (
                <GameItem id={item.id} key={item.id} type={'poster'} />
            ))}
        </>
    )
}

export default PosterTabsContent;