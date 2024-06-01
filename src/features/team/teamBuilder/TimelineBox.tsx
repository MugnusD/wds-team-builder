import {FC} from 'react';
import Slot from "./Slot.tsx";
import useBigScreenQuery from "../../../hooks/useBigScreenQuery.ts";
import {CiInboxIn, CiInboxOut} from "react-icons/ci";
import {Button} from "@material-tailwind/react";
import {compressSlots} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTeamIndex, selectSlots, setSlots, SlotType} from "../teamSlice.ts";
import {decompressSlots} from "../../../utils/string/decompressSlots.ts";

const TimelineBox: FC = () => {
    const isBigScreen = useBigScreenQuery();
    const slots = useSelector(selectSlots);
    const dispatch = useDispatch();
    const teamIndex = useSelector(selectCurrentTeamIndex);

    const handleCopyCode = () => {
        const copyCode = compressSlots(slots);
        navigator.clipboard.writeText(copyCode).then();
    };

    const handlePasteCode = () => {
        let pasteSlots: SlotType[];
        navigator.clipboard.readText()
            .then(text => {
                pasteSlots = decompressSlots(text);
                dispatch(setSlots({index: teamIndex, slots: pasteSlots}));
            });
    };

    return (
        <div className={'flex flex-col gap-2'}>
            <Slot slotIndex={0}/>
            <Slot slotIndex={1}/>
            <Slot slotIndex={2}/>
            <Slot slotIndex={3}/>
            <Slot slotIndex={4}/>
            {!isBigScreen && (
                <div className={'flex gap-4 justify-center mt-4'}>
                    <Button color={'blue-gray'} onClick={handlePasteCode}>
                        <CiInboxIn size={30}/>
                    </Button>
                    <Button color={'blue-gray'}>
                        <CiInboxOut size={30} onClick={handleCopyCode}/>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default TimelineBox;