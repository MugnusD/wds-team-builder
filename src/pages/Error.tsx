import {useRouteError} from "react-router-dom";

function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>Something went wrong</h1>
            <img src={'/stamps/40203.png'} alt={'dokidoki'} />
        </div>
    );
}

export default Error;
