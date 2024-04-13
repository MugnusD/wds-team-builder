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
    selectCardNameFilterArray, selectCardRarityFilterArray, selectCardSenseTypeFilterArray,
    selectCardSortAndFilter,
    setCardSortBy,
    SortBy,
    switchCardFilterByName, switchCardFilterByRarity, switchCardFilterBySenseType
} from "../selectTabsSlice.ts";
import {allCharacterNames} from "../../../types/characterName.ts";
import {IoIosStar} from "react-icons/io";
import {allCharacterRarities} from "../../../types/characterRarity.ts";
import {PiStarFourFill, PiSunFill} from "react-icons/pi";
import {GiBowTieRibbon, GiChestnutLeaf} from "react-icons/gi";
import {BiSolidMoon} from "react-icons/bi";

const TabsSortAndFilterDialogButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {sortBy} = useSelector(selectCardSortAndFilter);
    const checkedNames = useSelector(selectCardNameFilterArray);
    const checkedRarities = useSelector(selectCardRarityFilterArray);
    const checkedSenseTypes = useSelector(selectCardSenseTypeFilterArray);
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
                size={'md'}
            >
                <DialogHeader>Sort & Filter</DialogHeader>
                <DialogBody className="flex flex-col divide-y-2 divide-blue-gray-200">
                    <Select
                        label="Sort By"
                        value={sortBy}
                        onChange={(val) => dispatch(setCardSortBy(val as SortBy))}
                    >
                        <Option value="time">Sort by time (descending)</Option>
                        <Option value="rarity">Sort by rarity (descending)</Option>
                    </Select>
                    <div className={'flex flex-col divide-y-2 divide-blue-gray-200'}>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterNames.slice(0, 6).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterNames.slice(6, 11).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterNames.slice(11, 16).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            {allCharacterNames.slice(16, 21).map(name =>
                                <Checkbox
                                    checked={checkedNames.includes(name)}
                                    onChange={() => dispatch(switchCardFilterByName(name))}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                    </div>
                    <div className={'flex flex-row flex-wrap'}>
                        {allCharacterRarities.map(rarity => <Checkbox
                            label={<>{rarity[4]} <IoIosStar className={'inline-block'} /></>}
                            key={rarity}
                            checked={checkedRarities.includes(rarity)}
                            onChange={() => dispatch(switchCardFilterByRarity(rarity))}
                        />)}

                    </div>
                    <div>
                        <Checkbox
                            label={<PiStarFourFill color={'limegreen'} />}
                            color={'green'}
                            checked={checkedSenseTypes.includes('Support')}
                            onChange={() => dispatch(switchCardFilterBySenseType('Support'))}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'orangered'} />}
                            color={'orange'}
                            checked={checkedSenseTypes.includes('Amplification')}
                            onChange={() => dispatch(switchCardFilterBySenseType('Amplification'))}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'gold'} />}
                            color={'yellow'}
                            checked={checkedSenseTypes.includes('Special')}
                            onChange={() => dispatch(switchCardFilterBySenseType('Special'))}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'blue'} />}
                            color={'blue'}
                            checked={checkedSenseTypes.includes('Control')}
                            onChange={() => dispatch(switchCardFilterBySenseType('Control'))}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'black'} />}
                            checked={checkedSenseTypes.includes('None')}
                            onChange={() => {
                                dispatch(switchCardFilterBySenseType('None'));
                                dispatch(switchCardFilterBySenseType('Alternative'));
                            }}
                        />
                    </div>
                    <div>
                        <Checkbox label={<GiBowTieRibbon color={'deeppink'} />} color={'pink'} checked={true} />
                        <Checkbox label={<BiSolidMoon color={'deepskyblue'} />} color={'blue'} checked={true} />
                        <Checkbox label={<GiChestnutLeaf color={'limegreen'} />} color={"green"} checked={true} />
                        <Checkbox label={<PiSunFill color={'orangered'} />} color={'orange'} checked={true} />
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