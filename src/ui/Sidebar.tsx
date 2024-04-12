import {FC} from "react";
import SmallSidebar from "./SmallSidebar.tsx";
import BigSidebar from "./BigSidebar.tsx";
import useBigScreenQuery from "../hooks/useBigScreenQuery.ts";

const Sidebar: FC = () => {
    const isBigScreen = useBigScreenQuery();

    return (
        <>
            {isBigScreen
                ? <BigSidebar />
                : <SmallSidebar />
            }
        </>
    );
}


export default Sidebar;