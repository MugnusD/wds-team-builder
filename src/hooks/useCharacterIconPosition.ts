import {useQuery} from "@tanstack/react-query";
import {getCharacterIconPosition} from "../servers/fetchData.ts";

const useCharacterIconPosition = () => {
    const {isLoading, data: characterIconPosition, isError} = useQuery({
        queryKey: ['characterIconPosition'],
        queryFn: getCharacterIconPosition,
    });

    return {isLoading, characterIconPosition, isError};
};

export default useCharacterIconPosition;