import {FC, useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Option,
    Select,
} from "@material-tailwind/react";
import {PosterSortBy, selectPosterSortAndFiler, setPosterSortFilter} from "../selectTabsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useImmer} from "use-immer";

const PosterSortAndFilterButton: FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    // Global state
    const sortAndFilter = useSelector(selectPosterSortAndFiler);

    // Local states
    const [sortBy, setSortBy] = useState<PosterSortBy>('time');
    const [rarityFilterRecord, updateRarityFilterRecord] = useImmer<Record<PosterRarity, boolean>>({
        'R': true,
        'SR': true,
        'SSR': true,
    });

    // Mount local states from global state (when opening the dialog)
    useEffect(() => {
        setSortBy(sortAndFilter.sortBy);
        updateRarityFilterRecord(sortAndFilter.filterByRarity);
    }, [sortAndFilter.sortBy, isOpen, sortAndFilter.filterByRarity, updateRarityFilterRecord]);

    const handleSubmit = () => {
        dispatch(setPosterSortFilter({
            sortBy,
            filterByRarity: rarityFilterRecord,
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
                        <Option value="rarityAndTime">Sort by rarity & time (dictionary descending)</Option>
                    </Select>
                    <div className={'flex flex-row flex-wrap'}>
                        {(['SSR', 'SR', 'R'] as PosterRarity[]).map(rarity => <Checkbox
                            label={rarity}
                            key={rarity}
                            checked={rarityFilterRecord[rarity]}
                            onChange={() => updateRarityFilterRecord(draft => {
                                draft[rarity] = !draft[rarity]
                            })}
                        />)}
                    </div>
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