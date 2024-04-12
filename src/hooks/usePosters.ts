import {useQuery} from "@tanstack/react-query";
import { getPosters} from "../servers/fetchData.ts";

const useCharacters = () => {
    const {isLoading, data: posters, isError} =useQuery({
        queryKey: ['poster'],
        queryFn: getPosters,
    });

    return {isLoading, posters, isError};
}

export default useCharacters;