import {FC, useEffect, useState} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select} from "@material-tailwind/react";
import {PosterSortBy, selectPosterSortAndFiler, setPosterSortFilter} from "../selectTabsSlice.ts";
import {useDispatch, useSelector} from "react-redux";

const PosterSortAndFilterButton: FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    // Global state
    const sortAndFilter = useSelector(selectPosterSortAndFiler);

    // Local states
    const [sortBy, setSortBy] = useState<PosterSortBy>('time');

    // Mount local states from global state (when opening the dialog)
    useEffect(() => {
        setSortBy(sortAndFilter.sortBy);
    }, [sortAndFilter.sortBy, isOpen]);

    const handleSubmit = () => {
        dispatch(setPosterSortFilter({
            sortBy,
        }));
    };

    const handleOpen = () => {
        setIsOpen(open => !open);
    };

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
                    <Select
                        label="Sort By"
                        value={sortBy}
                        onChange={(value) => setSortBy(value as PosterSortBy)}
                    >
                        <Option value="time">Sort by time (descending)</Option>
                        <Option value="rarity">Sort by rarity (descending)</Option>
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient" color="green" onClick={() => {
                        handleOpen();
                        handleSubmit();
                    }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default PosterSortAndFilterButton;