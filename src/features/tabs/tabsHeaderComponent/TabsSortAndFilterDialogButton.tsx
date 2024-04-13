import {FC, useState} from 'react';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Select,
    Option,
    Checkbox, Typography
} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCardNameFilterArray,
    selectSortAndFilter,
    setCardSortBy,
    SortBy,
    switchCardFilterByName
} from "../selectTabsSlice.ts";
import {allCharacterFilter} from "../../../types/characterName.ts";

const TabsSortAndFilterDialogButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {sortBy} = useSelector(selectSortAndFilter);
    const checkedNames = useSelector(selectCardNameFilterArray);
    const dispatch = useDispatch();

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
                size={'xs'}
            >
                <DialogHeader>Sort & Filter</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Select
                        label="Sort By"
                        value={sortBy}
                        onChange={(val) => dispatch(setCardSortBy(val as SortBy))}
                    >
                        <Option value="time">Sort by time (descending)</Option>
                        <Option value="rarity">Sort by rarity (descending)</Option>
                    </Select>
                    <div className={'flex flex-col divide-y-2 divide-blue-gray-200 border-y-2 border-blue-gray-200'}>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterFilter.slice(0, 6).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterFilter.slice(6, 11).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterFilter.slice(11, 16).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterFilter.slice(16, 21).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className={'flex flex-col items-end'}>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                    <Typography variant={'small'}>
                        Only for cards for now.
                    </Typography>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default TabsSortAndFilterDialogButton;