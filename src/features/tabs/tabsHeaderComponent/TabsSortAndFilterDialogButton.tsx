import {FC, useState} from 'react';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import CharacterDialogContent from "./CharacterDialogContent.tsx";
import {useSelector} from "react-redux";
import {selectGameItemType} from "../selectTabsSlice.ts";


const TabsSortAndFilterDialogButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const tabType = useSelector(selectGameItemType);

    const handleOpen = () => {
        setIsOpen(open => !open);
    }

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                Sort & Filter
            </Button>
            <Dialog
                handler={handleOpen}
                open={isOpen}
                size={'md'}
            >
                <DialogHeader>Sort & Filter</DialogHeader>
                <DialogBody className="flex flex-col divide-y-2 divide-blue-gray-200">
                    {tabType === 'character' && <CharacterDialogContent />}
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default TabsSortAndFilterDialogButton;