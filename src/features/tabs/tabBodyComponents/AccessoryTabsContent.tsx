import {FC} from 'react';
import useAccessories from "../../../hooks/useAccessories.ts";
import clsx from "clsx";
import GameItem from "./GameItem.tsx";
import {Typography} from "@material-tailwind/react";
import {useSelector} from "react-redux";
import {selectTeamedAccessoryIds} from "../../team/teamSlice.ts";
import {convertUnityTag} from "../../../utils";


const AccessoryTabsContent: FC<{ display?: boolean }> = ({display = true}) => {
    const {accessories, isError, isLoading} = useAccessories();
    const teamedIds = useSelector(selectTeamedAccessoryIds);

    if (isLoading || isError || !accessories) {
        return null;
    }

    const items = accessories;

    items.sort((a, b) => b.rarity.length - a.rarity.length);

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

    return (
        <>
            <div className={clsx(!display && 'hidden')}>
                <GameItem id={0} detail={{type: 'accessory', rarity: 'R'}} render={() => <div>Empty poster</div>} />
            </div>
            {items.map(item => (
                <div
                    className={clsx(!display && 'hidden', teamedIds.includes(item.id) && 'ring-4 ring-red-500 rounded-full')}
                    key={item.id}
                >
                    <GameItem
                        id={item.id}
                        detail={{type: 'accessory', rarity: item.rarity}}
                        render={() => {
                            return (
                                <div className={'flex flex-col gap-2 divide-y divide-blue-gray-200 *:pt-2'}>
                                    <div>
                                        <Typography variant={'h5'}>
                                            {item.name}
                                        </Typography>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <Typography variant={'small'}>
                                            {convertUnityTag(item.effects[0].descriptionChinese)}
                                        </Typography>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <Typography variant={'small'}>
                                            {item.effects[1] && convertUnityTag(item.effects[1].descriptionChinese)}
                                            {item.randomEffects[0] && convertUnityTag(item.randomEffects[0].descriptionChinese)}
                                        </Typography>
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

export default AccessoryTabsContent;