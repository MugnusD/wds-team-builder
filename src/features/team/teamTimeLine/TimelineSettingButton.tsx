import {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography} from "@material-tailwind/react";
import {FaGear} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {selectLength, selectTimeline, setTimelineState} from "./timelineSlice.ts";

const numberArrayToString = (numbers: number[]): string => {
    return numbers.reduce((acc, number, currentIndex) => {
        return acc + number.toString() + (currentIndex === numbers.length - 1 ? '' : ', ');
    }, '');
};

const stringToNumberArray = (str: string, length: number): number[] | null => {
    const numbers = str.split(',').map(Number);

    for (const number of numbers) {
        if (number > length) {
            return null;
        }
    }

    return Array.from(new Set(numbers));
};

const validateTimelineInput = (value: string) => {
    return /^[0-9\s,]*$/.test(value);
};

const TimelineSettingButton: FC = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(isOpen => !isOpen);

    const [showWarning, setShowWarning] = useState(false);

    const length = useSelector(selectLength);
    const timeline = useSelector(selectTimeline);

    const [lengthInput, setLengthInput] = useState('');

    const [timeline0, setTimeline0] = useState('');
    const [timeline1, setTimeline1] = useState('');
    const [timeline2, setTimeline2] = useState('');
    const [timeline3, setTimeline3] = useState('');
    const [timeline4, setTimeline4] = useState('');

    useEffect(() => {
        setLengthInput(length.toString());
        setTimeline0(numberArrayToString(timeline["0"]));
        setTimeline1(numberArrayToString(timeline["1"]));
        setTimeline2(numberArrayToString(timeline["2"]));
        setTimeline3(numberArrayToString(timeline["3"]));
        setTimeline4(numberArrayToString(timeline["4"]));
    }, [length, isOpen, timeline]);

    const handleLengthInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value) && value.length < 4) {
            setLengthInput(value);
        }
    };

    const handleTimeline0Change: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        if (validateTimelineInput(value))
            setTimeline0(value);
    };
    const handleTimeline1Change: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        if (validateTimelineInput(value))
            setTimeline1(value);
    };
    const handleTimeline2Change: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        if (validateTimelineInput(value))
            setTimeline2(value);
    };
    const handleTimeline3Change: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        if (validateTimelineInput(value))
            setTimeline3(value);
    };
    const handleTimeline4Change: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        if (validateTimelineInput(value))
            setTimeline4(value);
    };

    const handleConfirm = () => {
        const currentLength = Number(lengthInput);

        const timeline0Array = stringToNumberArray(timeline0, currentLength);
        const timeline1Array = stringToNumberArray(timeline1, currentLength);
        const timeline2Array = stringToNumberArray(timeline2, currentLength);
        const timeline3Array = stringToNumberArray(timeline3, currentLength);
        const timeline4Array = stringToNumberArray(timeline4, currentLength);

        if (!timeline0Array || !timeline1Array || !timeline2Array|| !timeline3Array|| !timeline4Array) {
            setShowWarning(true);
            return;
        }

        dispatch(setTimelineState({
            length: currentLength,
            timeline: {
                0: timeline0Array,
                1: timeline1Array,
                2: timeline2Array,
                3: timeline3Array,
                4: timeline4Array,
            },
        }));
        handleOpen();
    };

    return (
        <>
            <Button onClick={handleOpen}>
                <FaGear />
            </Button>
            <Dialog open={isOpen} handler={handleOpen}>
                <DialogHeader>
                    Customize settings of sense timing
                </DialogHeader>
                <DialogBody className={'flex flex-col gap-4'}>
                    <div className={'flex flex-col gap-2'}>
                        <Typography>
                            Input the total length of the music(number of seconds up to 3 digits).
                        </Typography>
                        <Input label={'Length'} value={lengthInput} onChange={handleLengthInputChange} />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <Typography>
                            Input sense times in seconds for each skill, separated by commas.
                        </Typography>
                        <Input label={'Slot 1'} value={timeline0} onChange={handleTimeline0Change} />
                        <Input label={'Slot 2'} value={timeline1} onChange={handleTimeline1Change} />
                        <Input label={'Slot 3'} value={timeline2} onChange={handleTimeline2Change} />
                        <Input label={'Slot 4'} value={timeline3} onChange={handleTimeline3Change} />
                        <Input label={'Slot 5'} value={timeline4} onChange={handleTimeline4Change} />
                        {showWarning && (
                            <Typography variant={'small'} color={'red'}>
                                Sense times should not be should not be greater than total length!
                            </Typography>
                        )}
                    </div>
                </DialogBody>
                <DialogFooter className={'flex gap-3'}>
                    <Button variant="text" color="red" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default TimelineSettingButton;