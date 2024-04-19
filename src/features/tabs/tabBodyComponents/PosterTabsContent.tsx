import {FC} from 'react';
import GameItem from "./GameItem.tsx";
import usePosters from "../../../hooks/usePosters.ts";
import {useSelector} from "react-redux";
import {selectPosterSortAndFiler} from "../selectTabsSlice.ts";

const PosterTabsContent: FC = () => {
    const {posters, isLoading, isError} = usePosters();
    const {sortBy, filterByRarity} = useSelector(selectPosterSortAndFiler);

    if (isLoading || isError || !posters) {
        return null;
    }

    let items: PosterDetail[] = posters;

    // sorted by option next
    switch (sortBy) {
        case "time": {
            items.sort((a, b) =>
                b.displayStartAt.getTime() - a.displayStartAt.getTime());
            break;
        }
        case 'rarity': {
            items.sort((a, b) => b.rarity.length - a.rarity.length);
            break;
        }
        case "rarityAndTime": {
            items.sort((a, b) => {
                const rarityComp = b.rarity.length - a.rarity.length;
                if (rarityComp !== 0) {
                    return rarityComp;
                } else {
                    return b.displayStartAt.getTime() - a.displayStartAt.getTime();
                }
            });
        }
    }

    items = items.filter(poster => filterByRarity[poster.rarity]);

    return (
        <>
            <GameItem id={0} detail={{type: 'poster', rarity: 'R'}} render={() => <div>Empty poster</div>} />
            {items.map(item => (
                <GameItem
                    id={item.id}
                    key={item.id}
                    detail={{type: 'poster', rarity: item.rarity}}
                    render={() => (
                        <div>
                            {item.name}
                        </div>
                    )}
                />
            ))}
            <div>
                Count: {items.length}
            </div>
        </>
    );
};

export default PosterTabsContent;