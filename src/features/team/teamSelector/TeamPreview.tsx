import {ChangeEventHandler, FC, FocusEventHandler, useRef, useState} from 'react';
import useCharacters from "../../../hooks/useCharacters.ts";
import usePosters from "../../../hooks/usePosters.ts";
import useAccessories from "../../../hooks/useAccessories.ts";
import {
    resetTeamSlot,
    selectTeamByIndex,
    setSlots,
    setTitleWithIndex,
    SlotType,
    TeamIndex,
} from "../teamSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import TeamCharacterPreview from "./TeamCharacterPreview.tsx";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Spinner,
} from "@material-tailwind/react";
import {IconRenderDetails} from "../../../ui/GameItemIcon.tsx";
import useCopiedTeamContext from "./useCopiedTeamContext.ts";
import {compressSlots} from "../../../utils";
import {decompressSlots} from "../../../utils/string/decompressSlots.ts";
import {toPng} from "html-to-image";

const TeamPreview: FC<{
    teamIndex: TeamIndex,
}> = ({teamIndex}) => {
    const {characters, isLoading: isLoadingCharacter} = useCharacters();
    const {posters, isLoading: isLoadingPoster} = usePosters();
    const {accessories, isLoading: isLoadingAccessory} = useAccessories();

    const {slots, title} = useSelector(state => selectTeamByIndex(state, teamIndex));
    const [titleInput, setTitleInput] = useState(title);

    const {copiedTeamIndex, setCopiedTeamIndex, copyTeamToThis} = useCopiedTeamContext();

    const dispatch = useDispatch();

    const htmlImageRef = useRef(null);

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isDisableCopyCode, setIsDisableCopyCode] = useState(false);
    const [isDisablePasteCode, setIsDisablePasteCode] = useState(false);
    const [isOpenPasteWrongDialog, setIsOpenPasteWrongDialog] = useState(false);
    const [isPasteCodeSuccess, setIsPasteCodeSuccess] = useState(false);

    const [isImageCopying, setIsImageCopying] = useState(false);
    const [isImageCopiedSuccessfully, setIsImageCopiedSuccessfully] = useState(false);
    const [isCopyImageDialogOpen, setIsCopyImageDialogOpen] = useState(false);

    if (isLoadingAccessory || isLoadingCharacter || isLoadingPoster || !characters || !posters || !accessories) {
        return <Spinner />;
    }

    const slotsRenderPropsArray = slots.map(slot => {
        const {character: {characterId}, posterId, accessoryId, isLeader} = slot;

        let characterRenderDetail: IconRenderDetails;
        const characterDetail = characters.find(character => character.id === characterId);
        if (characterDetail) {
            characterRenderDetail = {
                type: 'character',
                attribute: characterDetail.attribute,
                sense: characterDetail.sense.type,
                rarity: characterDetail.rarity,
            };
        } else {
            characterRenderDetail = {
                type: 'character',
                attribute: 'Cute',
                sense: 'None',
                rarity: 'Rare1',
            };
        }

        let posterRenderDetail: IconRenderDetails;
        if (posterId === 0) {
            posterRenderDetail = {
                type: 'poster',
                rarity: 'R',
            };
        } else {
            const posterDetail = posters.find(poster => poster.id === posterId);
            if (posterDetail) {
                posterRenderDetail = {
                    type: 'poster',
                    rarity: posterDetail.rarity,
                };
            } else {
                posterRenderDetail = {
                    type: 'poster',
                    rarity: 'R',
                };
            }
        }

        let accessoryRenderDetail: IconRenderDetails;
        if (accessoryId === 0) {
            accessoryRenderDetail = {
                type: 'accessory',
                rarity: 'R',
            };
        } else {
            const accessoryDetail = accessories.find(accessory => accessory.id === accessoryId);
            if (accessoryDetail) {
                accessoryRenderDetail = {
                    type: 'accessory',
                    rarity: accessoryDetail.rarity,
                };
            } else {
                accessoryRenderDetail = {
                    type: 'accessory',
                    rarity: 'R',
                };
            }
        }

        return {
            characterId: characterId,
            characterDetail: characterRenderDetail,
            posterId: posterId,
            posterDetail: posterRenderDetail,
            accessoryId: accessoryId,
            accessoryDetail: accessoryRenderDetail,
            isLeader: isLeader,
        };
    });

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.length >= 50) {
            return;
        }

        setTitleInput(e.target.value);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        dispatch(setTitleWithIndex({name: e.target.value, index: teamIndex}));
    };

    const handleSetCopied = () => {
        if (copiedTeamIndex === teamIndex) {
            setCopiedTeamIndex(null);
        } else {
            setCopiedTeamIndex(teamIndex);
        }
    };

    const handleCopyToThis = () => {
        if (copiedTeamIndex !== teamIndex) {
            copyTeamToThis(teamIndex);
            setCopiedTeamIndex(null);
        }
    };

    const handleCopyCode = () => {
        setIsDisableCopyCode(true);
        const copyCode = compressSlots(slots);
        navigator.clipboard.writeText(copyCode).then(() => {
            setTimeout(() => {
                setIsDisableCopyCode(false);
            }, 1000);
        });
    };

    const handlePasteCode = () => {
        setIsDisablePasteCode(true);
        let pasteSlots: SlotType[];
        navigator.clipboard.readText()
            .then(text => {
                pasteSlots = decompressSlots(text);
                dispatch(setSlots({index: teamIndex, slots: pasteSlots}));
            })
            .then(() => {
                setIsPasteCodeSuccess(true);
                setTimeout(() => {
                    setIsPasteCodeSuccess(false);
                    setIsDisablePasteCode(false);
                }, 1000);
            })
            .catch(() => {
                setIsOpenPasteWrongDialog(true);
                setIsDisablePasteCode(false);
            });
    };

    const handleCopyImage = () => {
        setIsImageCopying(true);

        setTimeout(() => {
            if (!htmlImageRef.current) {
                return;
            }

            toPng(htmlImageRef.current)
                .then(url => {
                    return fetch(url);
                })
                .then(response => {
                    return response.blob();
                })
                .then(blob => {
                    const clipboardItem = new ClipboardItem({
                        'image/png': blob,
                    });
                    setIsImageCopying(false);
                    setIsImageCopiedSuccessfully(true);
                    setIsCopyImageDialogOpen(false);
                    setTimeout(() => {
                        setIsImageCopiedSuccessfully(false);
                    }, 3000);
                    return navigator.clipboard.write([clipboardItem]);
                })
                .catch(() => {
                    setIsImageCopying(false);
                });
        }, 50);
    };
    const handleOpenCopyImageDialog = () => {
        setIsCopyImageDialogOpen(isOpen => !isOpen);
    };

    // Reset Dialog
    const handleOpen = () => setIsOpenDialog(open => !open);

    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'w-12 pt-4'}>
                <Input
                    variant={'outlined'}
                    value={titleInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={'Team Title'}
                />
            </div>
            <div className={'flex gap-3'} key={teamIndex}>
                <div className={'flex gap-1.5'}>
                    {slotsRenderPropsArray.map(slotsRenderProps => (
                        <TeamCharacterPreview {...slotsRenderProps} key={slotsRenderProps.characterId} />
                    ))}
                </div>

                <div className={'flex flex-col flex-wrap justify-between h-36 gap-x-2'}>
                    <Button
                        variant={copiedTeamIndex === teamIndex ? 'filled' : 'outlined'}
                        color={copiedTeamIndex === teamIndex ? 'green' : 'gray'}
                        onClick={handleSetCopied}
                        className={'w-[88px]'}
                    >
                        {copiedTeamIndex === teamIndex ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                        variant={copiedTeamIndex === teamIndex || !copiedTeamIndex ? 'outlined' : 'filled'}
                        color={copiedTeamIndex === teamIndex || !copiedTeamIndex ? 'gray' : 'yellow'}
                        disabled={copiedTeamIndex === teamIndex || !copiedTeamIndex}
                        onClick={handleCopyToThis}
                    >
                        Paste
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleOpen}
                    >
                        Reset
                    </Button>
                    <Dialog open={isOpenDialog} handler={handleOpen} size={'sm'}>
                        <DialogHeader>Confirm Dialog</DialogHeader>
                        <DialogBody>
                            Are you sure to reset this team to default?
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={() => {
                                    dispatch(resetTeamSlot(teamIndex));
                                    handleOpen();
                                }}
                            >
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    <Button disabled={isDisableCopyCode} onClick={handleCopyCode} color={'blue'}>
                        {isDisableCopyCode ? 'Copied !' : 'Copy Code'}
                    </Button>

                    {/* Paste Code */}
                    <Button
                        disabled={isDisablePasteCode}
                        onClick={handlePasteCode}
                        className={'w-[120px]'}
                        color={'blue'}
                    >
                        {isPasteCodeSuccess ? 'Paste !' : 'Paste Code'}
                    </Button>
                    <Dialog open={isOpenPasteWrongDialog} handler={() => setIsOpenPasteWrongDialog(open => !open)}>
                        <DialogHeader>
                            Paste Code Wrong!
                        </DialogHeader>
                        <DialogBody>
                            The code from your clipboard is not valid, please check and try again.
                        </DialogBody>
                        <DialogFooter>
                            <Button onClick={() => setIsOpenPasteWrongDialog(open => !open)} color={'green'}>
                                Back
                            </Button>
                        </DialogFooter>
                    </Dialog>

                    <Button
                        color={'pink'}
                        onClick={handleOpenCopyImageDialog}
                        disabled={isImageCopiedSuccessfully}
                    >
                        {isImageCopiedSuccessfully ? 'Success !' : 'Copy Image'}
                    </Button>
                    <Dialog open={isCopyImageDialogOpen} handler={handleOpenCopyImageDialog} size={'xl'}>
                        <DialogHeader>
                            Copy Image
                        </DialogHeader>
                        <DialogBody className={'flex justify-center'}>
                            <div className={'flex gap-1.5'} ref={htmlImageRef}>
                                {slotsRenderPropsArray.map(slotsRenderProps => (
                                    <TeamCharacterPreview
                                        {...slotsRenderProps}
                                        key={slotsRenderProps.characterId}
                                        size={'large'}
                                    />
                                ))}
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant={'text'}
                                color={'red'}
                                onClick={handleOpenCopyImageDialog}
                                className={'mr-1'}
                                disabled={isImageCopying}
                            >
                                Cancel
                            </Button>
                            <Button color={'green'} onClick={handleCopyImage} disabled={isImageCopying}>
                                Copy to Clipboard
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TeamPreview;