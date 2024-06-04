import {createContext, FC, PropsWithChildren, useState} from "react";
import {copyTeam, TeamIndex} from "../teamSlice.ts";
import {useDispatch} from "react-redux";

type ContextProps = {
    copiedTeamIndex: TeamIndex | null,
    setCopiedTeamIndex: (index: TeamIndex | null) => void,
    copyTeamToThis: (index: TeamIndex) => void,
}

export const CopiedTeamContext = createContext<ContextProps>({
    copiedTeamIndex: null,
    setCopiedTeamIndex: () => {
    },
    copyTeamToThis: () => {
    },
});

export const CopiedTeamProvider: FC<PropsWithChildren> = ({children}) => {
    const [index, setIndex] = useState<TeamIndex | null>(null);
    const dispatch = useDispatch();

    const copyTo = (descIndex: TeamIndex) => {
        if (index) {
            dispatch(copyTeam({src: index, desc: descIndex}));
        }
    };

    return (
        <CopiedTeamContext.Provider
            value={{
                copiedTeamIndex: index,
                setCopiedTeamIndex: setIndex,
                copyTeamToThis: copyTo,
            }}
        >
            {children}
        </CopiedTeamContext.Provider>
    );
};
