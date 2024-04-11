import {useQuery} from "@tanstack/react-query";
import {getCharacters} from "../../servers/fetchData.ts";

const useCharacters = () => {
    const {isLoading, data: characters, isError} =useQuery({
        queryKey: ['character'],
        queryFn: getCharacters,
    });

    return {isLoading, characters, isError};
}

export default useCharacters;