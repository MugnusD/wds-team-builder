import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import useCharacters from "../../hooks/useCharacters.ts";
import usePosters from "../../hooks/usePosters.ts";
import useAccessories from "../../hooks/useAccessories.ts";
import useSlotDetail from "./useSlotDetail.ts";

type SlotDetail = {
    characterDetail: CharacterDetail | undefined,
    posterDetail: PosterDetail | undefined,
    accessoryDetail: AccessoryDetail | undefined,
    isLeader: boolean,
}

const defaultSlotDetail: SlotDetail = {
    characterDetail: undefined,
    posterDetail: undefined,
    accessoryDetail: undefined,
    isLeader: false,
};

type ContextProps = {
    0: SlotDetail,
    1: SlotDetail,
    2: SlotDetail,
    3: SlotDetail,
    4: SlotDetail,
    isLoading: boolean,
    isError: boolean
}

export const CurrentTeamContext = createContext<ContextProps>({
    0: defaultSlotDetail,
    1: defaultSlotDetail,
    2: defaultSlotDetail,
    3: defaultSlotDetail,
    4: defaultSlotDetail,
    isLoading: true,
    isError: true,
});

export const CurrentTeamContextProvider: FC<PropsWithChildren> = ({children}) => {
    // Fetch data
    const {isLoading: isLoadingCh, isError: isErrorCh, characters} = useCharacters();
    const {isLoading: isLoadingPo, isError: isErrorPo, posters} = usePosters();
    const {isLoading: isLoadingAc, isError: isErrorAc, accessories} = useAccessories();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(isLoadingCh && isLoadingPo && isLoadingAc)
    }, [isLoadingAc, isLoadingCh, isLoadingPo]);

    useEffect(() => {
        setIsError(isErrorCh && isErrorPo && isErrorAc)
    }, [isErrorAc, isErrorCh, isErrorPo]);
    
    const slot0 = useSlotDetail(0, characters, posters, accessories);
    const slot1 = useSlotDetail(1, characters, posters, accessories);
    const slot2 = useSlotDetail(2, characters, posters, accessories);
    const slot3 = useSlotDetail(3, characters, posters, accessories);
    const slot4 = useSlotDetail(4, characters, posters, accessories);

    return (
        <CurrentTeamContext.Provider
            value={{
                isLoading: isLoading,
                isError: isError,
                0: slot0,
                1: slot1,
                2: slot2,
                3: slot3,
                4: slot4,
            }}
        >
            {children}
        </CurrentTeamContext.Provider>
    );
};