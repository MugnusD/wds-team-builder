import {FC} from 'react';
import {GameItemType} from "./selectTabsSlice.ts";
import {useDispatch} from "react-redux";
import {resetFocusItem, swapFocusItemFromTab} from "../teamBuilder/teamSlice.ts";

/**
 * Render a game item. If it is a character, then props must have a characterBase(character's name)
 * in order to make sure no duplicate character(as different cards' avatar) in the team.
 * @param id
 * @param type
 * @param characterBase
 * @constructor
 */
const GameItem: FC<{
    id: number,
    type: GameItemType,
    characterBase?: string,
}> = ({id, type, characterBase = ''}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        if (type === 'accessory' || type === 'poster') {
            dispatch(swapFocusItemFromTab({id, type}));
        } else {
            dispatch(swapFocusItemFromTab({id, type, characterBase}));
        }

        dispatch(resetFocusItem());
    }

    let sourcePath: string;

    switch (type) {
        case "character": {
            sourcePath = `/${type}Icons/${id}_0.png`;
            break;
        }
        case "poster": {
            sourcePath = `/${type}Icons/${id}.png`;
            break;
        }
        case 'accessory': {
            sourcePath = '';
            break;
        }
    }

    return (
        <div className={'h-16 w-16'} onClick={handleClick}>
            <img
                src={sourcePath}
                alt={id.toString()}
            />
        </div>
    )
}

export default GameItem;