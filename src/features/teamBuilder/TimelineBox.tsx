import {FC} from 'react';
import Slot from "./Slot.tsx";
import useCharacters from "./useCharacters.ts";
import {Spinner} from "@material-tailwind/react";

const TimelineBox: FC = () => {
    const {isLoading} = useCharacters();

    if (isLoading)
        return (
            <div className={'flex justify-center items-center h-full'}>
                <Spinner className={'h-12 w-12'}/>
            </div>
        );

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