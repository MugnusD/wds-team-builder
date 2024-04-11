import {FC} from 'react';
import Slot from "./Slot.tsx";

const TimelineBox: FC = () => {
    return (
        <div className={'flex flex-col gap-2'}>
            <Slot slotIndex={0}/>
            <Slot slotIndex={1}/>
            <Slot slotIndex={2}/>
            <Slot slotIndex={3}/>
            <Slot slotIndex={4}/>
        </div>
    )
}

export default TimelineBox;