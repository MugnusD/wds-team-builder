import  {FC} from 'react';
import {GameItemType, selectISDetailMode} from "../selectTabsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {resetFocusItem, swapFocusItemFromTab, SwapPayload} from "../../teamBuilder/teamSlice.ts";
import {useNavigate} from "react-router-dom";
import {useDrag} from "react-dnd";
import AttributeIcon from "../../../ui/AttributeIcon.tsx";
import SenseIcon from "../../../ui/SenseIcon.tsx";

/**
 * Render a game item. If it is a character, then props must have a characterBase(character's name)
 * in order to make sure no duplicate character(as different cards' avatar) in the team.
 */
const GameItem: FC<{
    id: number,
    type: GameItemType,
    characterBase?: string,
    attribute?: AttributeType,
    sense?: SenseType,
    rarity?: CharacterRarity,
}> = ({id, type, characterBase = '', attribute, sense, rarity}) => {
    const dispatch = useDispatch();
    const isDetailMode = useSelector(selectISDetailMode);
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


    let sourcePath: string;

    switch (type) {
        case "character": {
            if (rarity === 'Rare4') {
                sourcePath = `/${type}Icons/${id}_1.png`;
            } else {
                sourcePath = `/${type}Icons/${id}_0.png`;
            }
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
        <div
            className={'h-16 w-16 relative ' + `${isDragging ? 'opacity-0' : ''}`}
            onClick={isDetailMode ? handleGoToDetail : handleSwapToTeam}
            ref={drag}
        >

            <img
                src={sourcePath}
                alt={id.toString()}
            />
            <div className={'absolute top-0 left-0 bg-stone-600 border-stone-300 border-2 rounded-full'}>
                <AttributeIcon attribute={attribute} />
            </div>
            <div className={'absolute bottom-0 left-0 bg-stone-600 border-stone-300 border-2 rounded-full'}>
                <SenseIcon senseType={sense} />
            </div>
        </div>
    )
}

export default GameItem;