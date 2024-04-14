import {FC} from 'react';
import {Checkbox, Option, Select} from "@material-tailwind/react";
import {
    selectCardAttributeTypeFilterArray,
    selectCardNameFilterArray, selectCardRarityFilterArray, selectCardSenseTypeFilterArray,
    selectCardSortAndFilter,
    setCardSortBy,
    SortBy, switchCardFilterByAttributeType,
    switchCardFilterByName,
    switchCardFilterByRarity,
    switchCardFilterBySenseType
} from "../selectTabsSlice.ts";
import {allCharacterNames} from "../../../types/characterName.ts";
import {allCharacterRarities} from "../../../types/characterRarity.ts";
import {IoIosStar} from "react-icons/io";
import {PiStarFourFill, PiSunFill} from "react-icons/pi";
import {GiBowTieRibbon, GiChestnutLeaf} from "react-icons/gi";
import {BiSolidMoon} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";

const CharacterDialogContent: FC = () => {
    const {sortBy} = useSelector(selectCardSortAndFilter);
    const checkedNames = useSelector(selectCardNameFilterArray);
    const checkedRarities = useSelector(selectCardRarityFilterArray);
    const checkedSenseTypes = useSelector(selectCardSenseTypeFilterArray);
    const checkedAttributeTypes = useSelector(selectCardAttributeTypeFilterArray);
    const dispatch = useDispatch();

    return (
        <>
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
                <Checkbox
                    label={<GiBowTieRibbon color={'deeppink'} />}
                    color={'pink'}
                    checked={checkedAttributeTypes.includes('Cute')}
                    onChange={() => dispatch(switchCardFilterByAttributeType('Cute'))}
                />
                <Checkbox
                    label={<BiSolidMoon color={'deepskyblue'} />}
                    color={'blue'}
                    checked={checkedAttributeTypes.includes('Cool')}
                    onChange={() => dispatch(switchCardFilterByAttributeType('Cool'))}
                />
                <Checkbox
                    label={<GiChestnutLeaf color={'limegreen'} />}
                    color={"green"}
                    checked={checkedAttributeTypes.includes('Colorful')}
                    onChange={() => dispatch(switchCardFilterByAttributeType('Colorful'))}
                />
                <Checkbox
                    label={<PiSunFill color={'orangered'} />}
                    color={'orange'}
                    checked={checkedAttributeTypes.includes('Cheerful')}
                    onChange={() => dispatch(switchCardFilterByAttributeType('Cheerful'))}
                />
            </div>
        </>
    )
}

export default CharacterDialogContent;