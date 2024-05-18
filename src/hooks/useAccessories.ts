import {useQuery} from "@tanstack/react-query";
import {getAccessories} from "../servers/fetchData.ts";

const useAccessories = () => {
    const {isLoading, data: accessories, isError} = useQuery({
        queryKey: ['accessory'],
        queryFn: getAccessories,
    });

    return {isLoading, accessories, isError};
};

export default useAccessories;