import {FC} from 'react';
import AttributeIcon from "./AttributeIcon.tsx";
import SenseIcon from "./SenseIcon.tsx";
import clsx from "clsx";
import {BsFileImage} from "react-icons/bs";

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
}

type IconProps = {
    id: number,
    detail: IconRenderDetails,
}

const GameItemIcon: FC<IconProps> = (props) => {
    const {id, detail} = props;

    if (detail.type === 'character') {
        const {type, attribute, sense, rarity} = detail;
        let sourcePath;

        if (rarity === 'Rare4') {
            sourcePath = `/${type}Icons/${id}_1.png`;
        } else {
            sourcePath = `/${type}Icons/${id}_0.png`;
        }


        return (
            <div
                // className={'h-16 w-16 relative p-1 rounded-xl ' + (rarity === 'Rare4' && ' bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] ')}
                className={clsx('h-16 w-16 relative p-1 rounded-xl',
                    rarity === 'Rare4' && 'bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77]',
                    rarity === 'Rare3' && 'bg-yellow-500',
                    (rarity === 'Rare2' || rarity === 'Rare1') && 'bg-gray-600',
                )}
            >
                <img
                    src={sourcePath}
                    alt={id.toString()}
                />
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
        const {type, rarity} = detail;

        return (
            <div
                // className={'h-16 w-16 relative p-1 rounded-xl ' + (rarity === 'Rare4' && ' bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] ')}
                className={clsx('h-16 w-16 relative p-1 rounded-full',
                    rarity === 'SSR' && 'bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77]',
                    rarity === 'SR' && 'bg-yellow-500',
                    rarity === 'R' && 'bg-gray-600',
                )}
            >
                {id !== 0 && <img
                    src={`/${type}Icons/${id}.png`}
                    alt={id.toString()}
                    className={'rounded-full'}
                />}
                {id === 0 &&
                    <div className={'bg-white rounded-full w-full h-full flex items-center justify-center'}><BsFileImage
                        size={35}
                        color={'#78909c'}
                    /></div>}
            </div>
        );
    }

    return null;
};

export default GameItemIcon;