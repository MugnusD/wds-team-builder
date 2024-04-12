import {FC} from "react";
import {useMediaQuery} from "react-responsive";
import SmallSidebar from "./SmallSidebar.tsx";
import BigSidebar from "./BigSidebar.tsx";

const Sidebar: FC = () => {
    const isBigScreen = useMediaQuery({
        minWidth: 768,
    });

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