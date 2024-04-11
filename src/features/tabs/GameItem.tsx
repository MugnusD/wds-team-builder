import {FC} from 'react';
import {GameItemType} from "./selectTabsSlice.ts";
import {useDispatch} from "react-redux";
import {resetFocusItem, swapFocusItemFromTab} from "../teamBuilder/teamSlice.ts";

const GameItem: FC<{
    id: number,
    type: GameItemType,
}> = ({id, type}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(swapFocusItemFromTab({id, type}));
        dispatch(resetFocusItem());
    }

    return (
        <div className={'h-16 w-16'} onClick={handleClick}>
            <img
                src={`/${type}Icons/${id}_0.png`}
                alt={id.toString()}
            />
        </div>
    )
}

export default GameItem;