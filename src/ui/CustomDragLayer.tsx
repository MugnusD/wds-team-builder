import {FC} from 'react';
import {useDragLayer} from "react-dnd";
import GameItemIcon, {IconRenderDetails} from "./GameItemIcon.tsx";
import {SlotIndex, SwapPayload} from "../features/team/teamSlice.ts";
import DraggedSlotPreview from "../features/team/teamBuilder/DraggedSlotPreview.tsx";

export type SlotItemType = {
    index: SlotIndex,
    characterId: number,
    posterId: number,
    accessoryId: number,
    characterIconDetail: IconRenderDetails,
    posterIconDetail: IconRenderDetails,
    accessoryIconDetail: IconRenderDetails,
    ct: number,
    isLeader: boolean,
}

const CustomDragLayer: FC = () => {
    const {itemType, isDragging, item, currentOffset}: {
        itemType: string | null | symbol;
        isDragging: boolean;
        item: SwapPayload & { detail: IconRenderDetails } | SlotItemType;
        currentOffset: { x: number, y: number } | null;
    } = useDragLayer(monitor => ({
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
    }));

    // TODO: The following type checking here is quite messy and may need to be optimized.
    //  But since it currently satisfies TS requirements, it might be of lower priority.
    //  At the end of day, if it runs, there is no need for changes.
    let gameItem: SwapPayload & { detail: IconRenderDetails },
        slotItem: SlotItemType;

    const renderItem = () => {
        if (itemType === 'poster' || itemType === 'character' || itemType === 'accessory') {
            gameItem = item as SwapPayload & { detail: IconRenderDetails };
            return <GameItemIcon id={gameItem.id} detail={gameItem.detail} />;
        }

        if (itemType === 'slot') {
            slotItem = item as SlotItemType;
            return <DraggedSlotPreview {...slotItem} />;
        }

        return null;
    };

    if (!isDragging) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 1000,
                left: currentOffset ? currentOffset.x : 0,
                top: currentOffset ? currentOffset.y : 0,
                opacity: 0.8,
            }}
        >
            {renderItem()}
        </div>
    );
};

export default CustomDragLayer;