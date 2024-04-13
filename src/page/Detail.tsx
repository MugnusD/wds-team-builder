import {FC} from 'react';
import {Typography} from "@material-tailwind/react";
import {Outlet} from "react-router-dom";

const Detail: FC = () => {
    return (
        <div className={'flex flex-col'}>
            <Typography variant={'h2'}>
                Card Detail
            </Typography>
            <Outlet />
        </div>
    )
}

export default Detail;