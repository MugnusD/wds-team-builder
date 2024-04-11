import {useQuery} from "@tanstack/react-query";
import {getCharacters} from "../../servers/fetchCharacters.ts";

const useCharacters = () => {
    const {isLoading, data: characters} =useQuery({
        queryKey: ['character'],
        queryFn: getCharacters,
    });

    return {isLoading, characters};
}

export default useCharacters;