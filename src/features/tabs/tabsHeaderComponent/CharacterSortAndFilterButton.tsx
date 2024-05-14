import {FC, useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, Option, Select,
} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCardSortAndFilter, setCardSortFilter,
    CharacterSortBy,
} from "../selectTabsSlice.ts";
import {allCharacterNames, characterNameFilterRecord} from "../../../types/character/characterName.ts";
import {allCharacterRarities, characterRarityFilterRecord} from "../../../types/character/characterRarity.ts";
import {IoIosStar} from "react-icons/io";
import {PiStarFourFill, PiSunFill} from "react-icons/pi";
import {GiBowTieRibbon, GiChestnutLeaf} from "react-icons/gi";
import {BiSolidMoon} from "react-icons/bi";
import {useImmer} from "use-immer";
import {allCharacterSenseType, characterSenseTypeFilterRecord} from "../../../types/character/characterSenseType.ts";
import {allCharacterAttributes, characterAttributeFilterRecord} from "../../../types/character/characterAttribute.ts";

const CharacterSortAndFilterButton: FC = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    // Global state
    const sortAndFilter = useSelector(selectCardSortAndFilter);

    // Local states
    const [sortBy, setSortBy] = useState<CharacterSortBy>('time');
    const [nameFilterRecord, updateNameFilterRecord] = useImmer(characterNameFilterRecord);
    const [rarityFilterRecord, updateRarityFilterRecord] = useImmer(characterRarityFilterRecord);
    const [senseTypeFilterRecord, updateSenseFilterRecord] = useImmer(characterSenseTypeFilterRecord);
    const [attributeFilterRecord, updateAttributeFilterRecord] = useImmer(characterAttributeFilterRecord);

    // Mount local states from global state (when opening the dialog)
    useEffect(() => {
        setSortBy(sortAndFilter.sortBy);
        updateNameFilterRecord(sortAndFilter.filterByCharacter);
        updateRarityFilterRecord(sortAndFilter.filterByRarity);
        updateSenseFilterRecord(sortAndFilter.filterBySenseType);
        updateAttributeFilterRecord(sortAndFilter.filterByAttributeType);
    }, [sortAndFilter.filterByAttributeType, sortAndFilter.filterByCharacter, sortAndFilter.filterByRarity, sortAndFilter.filterBySenseType, updateAttributeFilterRecord, updateNameFilterRecord, updateRarityFilterRecord, updateSenseFilterRecord, isOpen, sortAndFilter.sortBy]);

    const isSiriusAllChecked = allCharacterNames.slice(0, 6).reduce((previousValue, currentValue) => previousValue && nameFilterRecord[currentValue], true);
    const isEdenAllChecked = allCharacterNames.slice(6, 11).reduce((previousValue, currentValue) => previousValue && nameFilterRecord[currentValue], true);
    const isGingazaAllChecked = allCharacterNames.slice(11, 16).reduce((previousValue, currentValue) => previousValue && nameFilterRecord[currentValue], true);
    const isDenkiAllChecked = allCharacterNames.slice(16, 21).reduce((previousValue, currentValue) => previousValue && nameFilterRecord[currentValue], true);

    const isAllRarityChecked = allCharacterRarities.reduce((previousValue, currentValue) => previousValue && rarityFilterRecord[currentValue], true);
    const isAllSenseTypeChecked = allCharacterSenseType.reduce((previousValue, currentValue) => previousValue && senseTypeFilterRecord[currentValue], true);
    const isAllAttributeChecked = allCharacterAttributes.reduce((previousValue, currentValue) => previousValue && attributeFilterRecord[currentValue], true);

    const handleSubmit = () => {
        dispatch(setCardSortFilter({
            sortBy,
            filterByCharacter: nameFilterRecord,
            filterByRarity: rarityFilterRecord,
            filterBySenseType: senseTypeFilterRecord,
            filterByAttributeType: attributeFilterRecord,
        }));
    };

    const handleReset = () => {
        updateNameFilterRecord(characterNameFilterRecord);
        updateRarityFilterRecord(characterRarityFilterRecord);
        updateSenseFilterRecord(characterSenseTypeFilterRecord);
        updateAttributeFilterRecord(characterAttributeFilterRecord);
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
                        onChange={(value) => setSortBy(value as CharacterSortBy)}
                    >
                        <Option value="time">Sort by time (descending)</Option>
                        <Option value="rarity">Sort by rarity (descending)</Option>
                        <Option value="name">Sort by name of character</Option>
                        <Option value="rarityAndTime">Sort by rarity & time (dictionary descending)</Option>
                    </Select>
                    <div className={'flex flex-col divide-y-2 divide-blue-gray-200'}>
                        <div className={'flex flex-row flex-wrap'}>
                            <Checkbox
                                label={'All'}
                                checked={isSiriusAllChecked}
                                onChange={() => {
                                    if (isSiriusAllChecked) {
                                        allCharacterNames.slice(0, 6).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = false;
                                        }));
                                    } else {
                                        allCharacterNames.slice(0, 6).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = true;
                                        }));
                                    }
                                }}
                            />
                            {allCharacterNames.slice(0, 6).map(name =>
                                <Checkbox
                                    checked={nameFilterRecord[name]}
                                    onChange={() => updateNameFilterRecord(draft => {
                                        draft[name] = !draft[name];
                                    })}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            <Checkbox
                                label={'All'}
                                checked={isEdenAllChecked}
                                onChange={() => {
                                    if (isEdenAllChecked) {
                                        allCharacterNames.slice(6, 11).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = false;
                                        }));
                                    } else {
                                        allCharacterNames.slice(6, 11).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = true;
                                        }));
                                    }
                                }}
                            />
                            {allCharacterNames.slice(6, 11).map(name =>
                                <Checkbox
                                    checked={nameFilterRecord[name]}
                                    onChange={() => updateNameFilterRecord(draft => {
                                        draft[name] = !draft[name];
                                    })}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            <Checkbox
                                label={'All'}
                                checked={isGingazaAllChecked}
                                onChange={() => {
                                    if (isGingazaAllChecked) {
                                        allCharacterNames.slice(11, 16).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = false;
                                        }));
                                    } else {
                                        allCharacterNames.slice(11, 16).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = true;
                                        }));
                                    }
                                }}
                            />
                            {allCharacterNames.slice(11, 16).map(name =>
                                <Checkbox
                                    checked={nameFilterRecord[name]}
                                    onChange={() => updateNameFilterRecord(draft => {
                                        draft[name] = !draft[name];
                                    })}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                        <div className={'flex flex-row flex-wrap'}>
                            <Checkbox
                                label={'All'}
                                checked={isDenkiAllChecked}
                                onChange={() => {
                                    if (isDenkiAllChecked) {
                                        allCharacterNames.slice(16, 21).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = false;
                                        }));
                                    } else {
                                        allCharacterNames.slice(16, 21).forEach(name => updateNameFilterRecord(draft => {
                                            draft[name] = true;
                                        }));
                                    }
                                }}
                            />
                            {allCharacterNames.slice(16, 21).map(name =>
                                <Checkbox
                                    checked={nameFilterRecord[name]}
                                    onChange={() => updateNameFilterRecord(draft => {
                                        draft[name] = !draft[name];
                                    })}
                                    label={name}
                                    key={name}
                                />)}
                        </div>
                    </div>
                    <div className={'flex flex-row flex-wrap'}>
                        <Checkbox
                            label={'All'}
                            checked={isAllRarityChecked}
                            onChange={() => {
                                if (isAllRarityChecked) {
                                    allCharacterRarities.forEach(rarity => updateRarityFilterRecord(draft => {
                                        draft[rarity] = false;
                                    }));
                                } else {
                                    allCharacterRarities.forEach(rarity => updateRarityFilterRecord(draft => {
                                        draft[rarity] = true;
                                    }));
                                }
                            }}
                        />
                        {allCharacterRarities.map(rarity => <Checkbox
                            label={<>{rarity[4]} <IoIosStar className={'inline-block'} /></>}
                            key={rarity}
                            checked={rarityFilterRecord[rarity]}
                            onChange={() => updateRarityFilterRecord(draft => {
                                draft[rarity] = !draft[rarity];
                            })}
                        />)}
                    </div>
                    <div>
                        <Checkbox
                            label={'All'}
                            checked={isAllSenseTypeChecked}
                            onChange={() => {
                                if (isAllSenseTypeChecked) {
                                    allCharacterSenseType.forEach(senseType => updateSenseFilterRecord(draft => {
                                        draft[senseType] = false;
                                    }));
                                } else {
                                    allCharacterSenseType.forEach(senseType => updateSenseFilterRecord(draft => {
                                        draft[senseType] = true;
                                    }));
                                }
                            }}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'limegreen'} />}
                            color={'green'}
                            checked={senseTypeFilterRecord['Support']}
                            onChange={() => updateSenseFilterRecord(draft => {
                                draft['Support'] = !draft['Support'];
                            })}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'orangered'} />}
                            color={'orange'}
                            checked={senseTypeFilterRecord['Amplification']}
                            onChange={() => updateSenseFilterRecord(draft => {
                                draft['Amplification'] = !draft['Amplification'];
                            })}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'gold'} />}
                            color={'yellow'}
                            checked={senseTypeFilterRecord['Special']}
                            onChange={() => updateSenseFilterRecord(draft => {
                                draft['Special'] = !draft['Special'];
                            })}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'blue'} />}
                            color={'blue'}
                            checked={senseTypeFilterRecord['Control']}
                            onChange={() => updateSenseFilterRecord(draft => {
                                draft['Control'] = !draft['Control'];
                            })}
                        />
                        <Checkbox
                            label={<PiStarFourFill color={'black'} />}
                            checked={senseTypeFilterRecord['None']}
                            onChange={() => updateSenseFilterRecord(draft => {
                                draft['None'] = !draft['None'];
                                draft['Alternative'] = !draft['Alternative'];
                            })}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label={'All'}
                            checked={isAllAttributeChecked}
                            onChange={() => {
                                if (isAllAttributeChecked) {
                                    allCharacterAttributes.forEach(attribute => updateAttributeFilterRecord(draft => {
                                        draft[attribute] = false;
                                    }));
                                } else {
                                    allCharacterAttributes.forEach(attribute => updateAttributeFilterRecord(draft => {
                                        draft[attribute] = true;
                                    }));
                                }
                            }}
                        />
                        <Checkbox
                            label={<GiBowTieRibbon color={'deeppink'} />}
                            color={'pink'}
                            checked={attributeFilterRecord['Cute']}
                            onChange={() => updateAttributeFilterRecord(draft => {
                                draft['Cute'] = !draft['Cute'];
                            })}
                        />
                        <Checkbox
                            label={<BiSolidMoon color={'deepskyblue'} />}
                            color={'blue'}
                            checked={attributeFilterRecord['Cool']}
                            onChange={() => updateAttributeFilterRecord(draft => {
                                draft['Cool'] = !draft['Cool'];
                            })}
                        />
                        <Checkbox
                            label={<GiChestnutLeaf color={'limegreen'} />}
                            color={"green"}
                            checked={attributeFilterRecord['Colorful']}
                            onChange={() => updateAttributeFilterRecord(draft => {
                                draft['Colorful'] = !draft['Colorful'];
                            })}
                        />
                        <Checkbox
                            label={<PiSunFill color={'orangered'} />}
                            color={'orange'}
                            checked={attributeFilterRecord['Cheerful']}
                            onChange={() => updateAttributeFilterRecord(draft => {
                                draft['Cheerful'] = !draft['Cheerful'];
                            })}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className={'space-x-4'}>
                    <Button
                        variant="gradient" color="black"
                        onClick={() => {
                            handleReset();
                        }}
                    >
                        <span>Reset</span>
                    </Button>
                    <Button
                        variant="gradient" color="green"
                        onClick={() => {
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

export default CharacterSortAndFilterButton;