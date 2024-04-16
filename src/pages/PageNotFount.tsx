import {FC} from 'react';
import {Button, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const PageNotFount: FC = () => {
    return (
        <section className="flex items-center justify-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <Typography variant={'h1'} className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
                        <span className="sr-only">Error</span>404
                    </Typography>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">Page Not Found</p>
                    <img src={'/stamps/40204.png'} alt={'ei...'} />
                    <Link to={'/team-builder'} replace={true}>
                        <Button>
                            Back Home
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PageNotFount;