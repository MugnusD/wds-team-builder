import {FC} from 'react';
import {Switch, Typography} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {selectISDetailMode, switchDetailMode} from "../selectTabsSlice.ts";

const TabsOptions: FC = () => {
    const isDetailMode = useSelector(selectISDetailMode);
    const dispatch = useDispatch();

    return (
        <div>
            <Switch
                label={<Typography className={'font-medium'} color={'blue-gray'}>Detail</Typography>}
                checked={isDetailMode}
                onChange={() => dispatch(switchDetailMode())}
            />
        </div>
    )
}

export default TabsOptions;