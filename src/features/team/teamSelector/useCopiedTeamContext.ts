import {useContext} from "react";
import {CopiedTeamContext} from "./CopiedTeamContext.tsx";

const useCopiedTeamContext = () => {
    return useContext(CopiedTeamContext);
}

export default useCopiedTeamContext;