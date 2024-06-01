import {FC} from "react";
import BigSidebar from "./BigSidebar.tsx";
import useBigScreenQuery from "../hooks/useBigScreenQuery.ts";

const Sidebar: FC = () => {
    const isBigScreen = useBigScreenQuery();

    return (
        <>
            {isBigScreen
                ? <BigSidebar />
                : null
            }
        </>
    );
}


export default Sidebar;