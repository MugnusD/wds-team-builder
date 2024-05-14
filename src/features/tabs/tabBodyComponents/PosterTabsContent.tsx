import {FC} from 'react';
import GameItem from "./GameItem.tsx";
import usePosters from "../../../hooks/usePosters.ts";
import {useSelector} from "react-redux";
import {selectPosterSortAndFiler} from "../selectTabsSlice.ts";
import {Typography} from "@material-tailwind/react";
import {convertUnityTag} from "../../../utils";
import clsx from "clsx";
import {selectTeamedPosterIds} from "../../teamBuilder/teamSlice.ts";

const PosterTabsContent: FC<{ display: boolean }> = ({display}) => {
    const {posters, isLoading, isError} = usePosters();
    const {sortBy, filterByRarity} = useSelector(selectPosterSortAndFiler);
    const teamedIds = useSelector(selectTeamedPosterIds);

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

    items = items.filter(poster => filterByRarity[poster.rarity]);

    return (
        <>
            <div className={clsx(!display && 'hidden')}>
                <GameItem id={0} detail={{type: 'poster', rarity: 'R'}} render={() => <div>Empty poster</div>} />
            </div>
            {items.map(item => (
                <div className={clsx(!display && 'hidden', teamedIds.includes(item.id) && 'ring-4 ring-red-500 rounded-full')}>
                    <GameItem
                        id={item.id}
                        key={item.id}
                        detail={{type: 'poster', rarity: item.rarity}}
                        render={() => {
                            const leaderAbilities = item.abilities.filter(el => el.type === 'Leader');
                            const normalAbilities = item.abilities.filter(el => el.type !== 'Leader');

                            return (
                                <div className={'flex flex-col gap-2 divide-y divide-blue-gray-200 *:pt-2'}>
                                    <div>
                                        <Typography variant={'h5'}>
                                            {item.name}
                                        </Typography>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <Typography
                                            color={'red'}
                                            variant={'h6'}
                                        >Leader {leaderAbilities.length === 1 ? 'ability' : 'abilities'}</Typography>
                                        {leaderAbilities.map(el => <div key={el.name}>
                                            <Typography color={'deep-orange'} variant={'small'}>{el.name}: </Typography>
                                            <Typography variant={'small'}>{convertUnityTag(el.descriptionChinese)}</Typography>
                                        </div>)}
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <Typography variant={'h6'}>Normal {normalAbilities.length === 1 ? 'ability' : 'abilities'}</Typography>
                                        {normalAbilities.map(el => <div key={el.name}>
                                            <Typography color={'deep-orange'} variant={'small'}>{el.name}: </Typography>
                                            <Typography variant={'small'}>{convertUnityTag(el.descriptionChinese)}</Typography>
                                        </div>)}
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

export default PosterTabsContent;