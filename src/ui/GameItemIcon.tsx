import {FC} from 'react';
import AttributeIcon from "./AttributeIcon.tsx";
import SenseIcon from "./SenseIcon.tsx";
import clsx from "clsx";
import {BsFileImage} from "react-icons/bs";
import useCharacterIconPosition from "../hooks/useCharacterIconPosition.ts";
import usePosterIconPosition from "../hooks/usePosterIconPosition.ts";
import useAccessoryIconPosition from "../hooks/useAccessoryIconPosition.ts";
import {GiDiamondRing} from "react-icons/gi";

export type IconRenderDetails = {
    type: 'character',
    attribute: AttributeType,
    sense: SenseType,
    rarity: CharacterRarity,
} | {
    type: 'poster',
    rarity: PosterRarity,
} | {
    type: 'accessory',
    rarity: AccessoryRarity,
}

type IconProps = {
    id: number,
    detail: IconRenderDetails,
}

const GameItemIcon: FC<IconProps> = (props) => {
    const {id, detail} = props;
    const {characterIconPosition} = useCharacterIconPosition();
    const {posterIconPosition} = usePosterIconPosition();
    const {accessoryIconPosition} = useAccessoryIconPosition();

    if (detail.type === 'character') {
        const {attribute, sense, rarity} = detail;
        // let sourcePath;
        let fullId: string;

        if (rarity === 'Rare4') {
            // sourcePath = `/${type}Icons/${id}_1.webp`;
            fullId = id.toString() + '_1';
        } else {
            // sourcePath = `/${type}Icons/${id}_0.webp`;
            fullId = id.toString() + '_0';
        }

        const position = characterIconPosition ? `-${characterIconPosition[fullId].x}px -${characterIconPosition[fullId].y}px` : '';
        const ratio = 56 / 188;

        return (
            <div
                // className={'h-16 w-16 relative p-1 rounded-xl ' + (rarity === 'Rare4' && ' bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] ')}
                className={clsx('h-16 w-16 relative p-1 rounded-xl',
                    rarity === 'Rare4' && 'bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77]',
                    rarity === 'Rare3' && 'bg-yellow-500',
                    (rarity === 'Rare2' || rarity === 'Rare1') && 'bg-gray-600',
                )}
            >
                {/*
                <img
                    src={sourcePath}
                    alt={id.toString()}
                    draggable={false}
                    className={'select-none'}
                />*/}


                <div
                    style={{
                        backgroundImage: 'url("/img/character_sprite.webp")',
                        width: '188px',
                        height: '188px',
                        backgroundPosition: position,
                        transform: `scale(${ratio}) translate(-223px, -223px)`,
                    }}
                ></div>

                <div className={'absolute top-0 left-0 bg-stone-600 border-gold-500 border-2 rounded-full'}>
                    <AttributeIcon attribute={attribute} />
                </div>
                <div className={'absolute bottom-0 left-0 bg-stone-600 border-silver-500 border-2 rounded-full'}>
                    <SenseIcon senseType={sense} />
                </div>
            </div>
        );
    }

    if (detail.type === 'poster') {
        const {rarity} = detail;
        const position = posterIconPosition ? `-${posterIconPosition[id.toString()]?.x ?? '0'}px -${posterIconPosition[id.toString()]?.y ?? '0'}px` : '';
        const ratio = 56 / 188;

        return (
            <div
                // className={'h-16 w-16 relative p-1 rounded-xl ' + (rarity === 'Rare4' && ' bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] ')}
                className={clsx('h-16 w-16 relative p-1 rounded-full',
                    rarity === 'SSR' && 'bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77]',
                    rarity === 'SR' && 'bg-yellow-500',
                    rarity === 'R' && 'bg-gray-600',
                )}
            >
                {id !== 0 &&
                    /*                    <img
                                            src={`/${type}Icons/${id}.webp`}
                                            alt={id.toString()}
                                            className={'rounded-full select-none'}
                                            draggable={false}
                                        />*/

                    <div
                        style={{
                            backgroundImage: 'url("/img/poster_sprite.webp")',
                            width: '188px',
                            height: '188px',
                            backgroundPosition: position,
                            transform: `scale(${ratio}) translate(-223px, -223px)`,
                            borderRadius: '50%',
                        }}
                    ></div>

                }
                {id === 0 &&
                    <div className={'bg-white rounded-full w-full h-full flex items-center justify-center -z-10'}>
                        <BsFileImage
                            size={35}
                            color={'#78909c'}
                        />
                    </div>
                }
            </div>
        );
    }

    if (detail.type === 'accessory') {
        const {rarity} = detail;
        const position = accessoryIconPosition ? `-${accessoryIconPosition[id.toString()]?.x ?? '0'}px -${accessoryIconPosition[id.toString()]?.y ?? '0'}px` : '';
        const ratio = 56 / 188;

        return (
            <div
                // className={'h-16 w-16 relative p-1 rounded-xl ' + (rarity === 'Rare4' && ' bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] ')}
                className={clsx('h-16 w-16 relative p-1 rounded-full',
                    rarity === 'SSR' && 'bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77]',
                    rarity === 'SR' && 'bg-yellow-500',
                    rarity === 'R' && 'bg-gray-600',
                )}
            >
                {id !== 0 &&
                    /*                    <img
                                            src={`/${type}Icons/${id}.webp`}
                                            alt={id.toString()}
                                            className={'rounded-full select-none'}
                                            draggable={false}
                                        />*/

                    <div
                        style={{
                            backgroundImage: 'url("/img/accessory_sprite.webp")',
                            width: '188px',
                            height: '188px',
                            backgroundPosition: position,
                            transform: `scale(${ratio}) translate(-223px, -223px)`,
                            borderRadius: '50%',
                        }}
                    ></div>

                }
                {id === 0 &&
                    <div className={'bg-white rounded-full w-full h-full flex items-center justify-center -z-10'}>
                        <GiDiamondRing
                            size={35}
                            color={'#78909c'}
                        />
                    </div>
                }
            </div>
        );
    }

    return null;
};

export default GameItemIcon;