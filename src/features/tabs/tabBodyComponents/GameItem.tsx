import {FC, MouseEventHandler, ReactElement, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {resetFocusItem, swapFocusItemFromTab, SwapPayload} from "../../team/teamSlice.ts";
import {useNavigate} from "react-router-dom";
import {useDrag} from "react-dnd";
import GameItemIcon, {IconRenderDetails} from "../../../ui/GameItemIcon.tsx";
import {getEmptyImage} from "react-dnd-html5-backend";
import {Button, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";

/**
 * Renders a game item. If it is a character, props must include characterBase (character's name)
 * to ensure no duplicate characters (as different cards' avatars) in the team.
 */
const GameItem: FC<{
    id: number,
    characterBase?: string,
    detail: IconRenderDetails,
    render: () => ReactElement,
}> = ({id, characterBase = '', detail, render}) => {
    const type = detail.type;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    let timer: NodeJS.Timeout;

    const handleMouseEnterIcon: MouseEventHandler = () => {
        // Delay display popover
        timer = setTimeout(() => {
            setIsPopoverOpen(true);
        }, 700);
    };

    const handleMouseLeaveIcon: MouseEventHandler = () => {
        // Clear popover timer
        clearTimeout(timer);
        setIsPopoverOpen(false);
    };

    // DnD
    const [{isDragging}, drag, preview] = useDrag<
        SwapPayload & { detail: IconRenderDetails }, void, { isDragging: boolean }
    >({
        type,
        item: () => {
            dispatch(resetFocusItem());

            switch (type) {
                case "character": {
                    return {
                        type,
                        id,
                        characterBase,
                        detail,
                    };
                }
                case "poster": {
                    return {type, id, detail};
                }
                case "accessory": {
                    return {type, id, detail};
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // hide html preview
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);

    const handleSwapToTeam = () => {
        if (type === 'accessory' || type === 'poster') {
            dispatch(swapFocusItemFromTab({id, type}));
        } else {
            dispatch(swapFocusItemFromTab({id, type, characterBase}));
        }

        dispatch(resetFocusItem());
    };

    const handleGoToDetail = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <div ref={drag} onClick={handleSwapToTeam} className={'hover:scale-110 duration-200 ease-out'}>
            <Popover open={isPopoverOpen} handler={setIsPopoverOpen}>
                <PopoverHandler
                    onMouseEnter={handleMouseEnterIcon}
                    onMouseLeave={handleMouseLeaveIcon}
                >
                    <div
                        className={`${isDragging ? 'opacity-0' : ''}`}
                        // TODO remove handleSwapToTeam & detail Mode
                        // onClick={isDetailMode ? handleGoToDetail : handleSwapToTeam}
                    >
                        <GameItemIcon id={id} detail={detail} />
                    </div>
                </PopoverHandler>
                {!isDragging && (
                    <PopoverContent
                        className="z-50 max-w-[26rem] bg-stone-100 flex-col flex gap-2 items-center"
                        onMouseEnter={() => setIsPopoverOpen(true)}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <>
                            {render && render()}
                        </>
                        <Button onClick={handleGoToDetail} size={"sm"} className={'w-20'}>
                            Detail
                        </Button>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
};

export default GameItem;