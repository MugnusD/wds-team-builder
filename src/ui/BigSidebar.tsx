import {FC, ReactNode} from 'react';
import {Card, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import {HiHome, HiMiniSquare3Stack3D} from "react-icons/hi2";
import {TbError404} from "react-icons/tb";
import {NavLink} from "react-router-dom";
import {GiCardPick} from "react-icons/gi";

const BigSidebar: FC = () => {
    return (
        <Card
            className="h-full w-[17rem] max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5 "
        >
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    WDS 配队器
                </Typography>
            </div>
            <List className={'w-60 '}>
                <SidebarListItem icon={<HiHome />} to={'/home'} content={'Home'} />
                <SidebarListItem
                    icon={<HiMiniSquare3Stack3D />}
                    to={'/team-builder'}
                    content={'Team Builder'}
                />
                <SidebarListItem icon={<GiCardPick />} to={'/detail'} content={'Card Detail'} />
                <SidebarListItem icon={<TbError404 />} to={'/404'} content={'404 Test'} />
            </List>
        </Card>
    )
}

const SidebarListItem: FC<{
    icon: ReactNode,
    to: string,
    content: string
}> = ({icon, to, content}) => {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                isActive ? 'text-blue-400' : ''
            }
        >
            <ListItem className={'hover:text-purple-400 focus:text-blue-400 active:text-blue-400'}>
                <ListItemPrefix>
                    {icon}
                </ListItemPrefix>
                {content}
            </ListItem>
        </NavLink>
    )
};

export default BigSidebar;
