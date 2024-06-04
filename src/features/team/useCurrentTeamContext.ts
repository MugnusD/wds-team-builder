import {useContext} from "react";
import {CurrentTeamContext} from "./CurrentTeamContext.tsx";

const useCurrentTeamContext = () => {
    return useContext(CurrentTeamContext);
}

export default useCurrentTeamContext;