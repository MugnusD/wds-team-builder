import {
    Card,
    Typography,
    List,
    ListItem, ListItemPrefix,
} from "@material-tailwind/react";

import {FC, ReactNode} from "react";
import {NavLink} from "react-router-dom";

import {HiHome, HiMiniSquare3Stack3D} from "react-icons/hi2";
import {TbError404} from "react-icons/tb";

const Sidebar: FC = () => {
    return (
        <Card
            className="h-full w-full max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5"
        >
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    WDS 配队器
                </Typography>
            </div>
            <List className={'w-60 '}>
                <SidebarListItem icon={<HiHome />} to={'/home'} context={'Home'} />
                <SidebarListItem icon={<HiMiniSquare3Stack3D />} to={'/team-builder'} context={'Team Builder'} />
                <SidebarListItem icon={<TbError404 />} to={'/404'} context={'404 Test'} />
            </List>
        </Card>
    );
}

const SidebarListItem: FC<{
    icon: ReactNode,
    to: string,
    context: string
}> = ({
          icon,
          to,
          context
      }) => {
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
                {context}
            </ListItem>
        </NavLink>
    )
}

export default Sidebar;