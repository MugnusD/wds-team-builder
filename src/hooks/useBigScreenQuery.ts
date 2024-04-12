import {useMediaQuery} from "react-responsive";

const useBigScreenQuery = () => {
    return useMediaQuery({
        minWidth: 1024,
    });
}

export default useBigScreenQuery;