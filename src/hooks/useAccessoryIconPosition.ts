import {useQuery} from "@tanstack/react-query";
import {getAccessoryIconPosition} from "../servers/fetchData.ts";

const useAccessoryIconPosition = () => {
    const {isLoading, data: accessoryIconPosition, isError} = useQuery({
        queryKey: ['accessory-icon'],
        queryFn: getAccessoryIconPosition,
    });

    return {isLoading, accessoryIconPosition, isError};
};

export default useAccessoryIconPosition;