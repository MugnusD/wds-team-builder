import {useQuery} from "@tanstack/react-query";
import {getPosterIconPosition} from "../servers/fetchData.ts";

const usePosterIconPosition = () => {
    const {isLoading, data: posterIconPosition, isError} = useQuery({
        queryKey: ['position-icon'],
        queryFn: getPosterIconPosition,
    });

    return {isLoading, posterIconPosition, isError};
};

export default usePosterIconPosition;