import  {FC} from 'react';
import { selectIsDetailMode} from "../selectTabsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {resetFocusItem, swapFocusItemFromTab, SwapPayload} from "../../teamBuilder/teamSlice.ts";
import {useNavigate} from "react-router-dom";
import {useDrag} from "react-dnd";
import GameItemIcon, { IconRenderDetails} from "../../../ui/GameItemIcon.tsx";

/**
 * Render a game item. If it is a character, then props must have a characterBase(character's name)
 * in order to make sure no duplicate character(as different cards' avatar) in the team.
 */
const GameItem: FC<{
    id: number,
    characterBase?: string,
    detail: IconRenderDetails
}> = ({id, characterBase = '', detail}) => {
    const type = detail.type;

    const dispatch = useDispatch();
    const isDetailMode = useSelector(selectIsDetailMode);
    const navigate = useNavigate();

    // DnD
    const [{isDragging}, drag] = useDrag<SwapPayload, void, { isDragging: boolean }>({
        type,
        item: () => {
            dispatch(resetFocusItem());
            
            switch (type) {
                case "character": {
                    return {
                        type,
                        id,
                        characterBase,
                    }
                }
                case "poster": {
                    return {type, id}
                }
                case "accessory": {
                    return {type, id}
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const handleSwapToTeam = () => {
        if (type === 'accessory' || type === 'poster') {
            dispatch(swapFocusItemFromTab({id, type}));
        } else {
            dispatch(swapFocusItemFromTab({id, type, characterBase}));
        }

        dispatch(resetFocusItem());
    }

    const handleGoToDetail = () => {
        navigate(`/detail/${id}`);
    }

    return (
        <div
            className={`${isDragging ? 'opacity-0' : ''}`}
            onClick={isDetailMode ? handleGoToDetail : handleSwapToTeam}
            ref={drag}
        >
            <GameItemIcon id={id} detail={detail} />
        </div>
    )
}

export default GameItem;