import {FC, ReactNode, useState} from 'react';
import {HiHome, HiMiniSquare3Stack3D, HiOutlineChevronDoubleRight} from "react-icons/hi2";
import {HiOutlineChevronDoubleLeft} from "react-icons/hi";
import {NavLink} from "react-router-dom";
import {GiCardPick} from "react-icons/gi";

const SmallSidebar: FC = () => {
    const [isSpanned, setIsSpanned] = useState(true);

    if (isSpanned)
        return (
            <div className={'flex flex-col justify-between h-full'}>
                <ul className={'flex w-16 flex-col items-center pt-4 gap-4 divide-y-4'}>
                    <SmallNavIcon icon={<HiMiniSquare3Stack3D size={40} />} to={'/team-builder'} />
                    <SmallNavIcon icon={<GiCardPick size={40} />} to={'/detail'} />
                    <SmallNavIcon icon={<HiHome size={40} />} to={'/home'} />
                </ul>
                <div className={'flex w-16 justify-center pb-4'}>
                    <HiOutlineChevronDoubleLeft className={'bg-stone-200 rounded-md'} size={40} onClick={() => setIsSpanned(state => !state)} />
                </div>
            </div>
        );

    if (!isSpanned)
        return (
            <div className={'fixed bottom-4 left-3 flex content-center items-center z-10'}>
                <HiOutlineChevronDoubleRight
                    className={'flex-1 bg-stone-200 rounded-md'}
                    size={40}
                    onClick={() => setIsSpanned(true)}
                />
            </div>
        );
}

const SmallNavIcon: FC<{
    icon: ReactNode,
    to: string,
}> = ({icon, to}) => {
    return (
        <li className={'hover:text-purple-400 focus:text-blue-400 active:text-blue-400 pt-4 first:pt-0'}>
            <NavLink
                to={to} className={({isActive}) =>
                isActive ? 'text-blue-400' : ''
            }
            >

                <div>
                    {icon}
                </div>
            </NavLink>
        </li>
    )
}

// TODO: unused
export default SmallSidebar;