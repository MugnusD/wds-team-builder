import {useContext} from "react";
import {CopiedTeamContext} from "./SelectedIndexContent.tsx";

const useCopiedTeamContext = () => {
    return useContext(CopiedTeamContext);
}

export default useCopiedTeamContext;