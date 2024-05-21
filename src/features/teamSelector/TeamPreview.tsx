import {ChangeEventHandler, FC, FocusEventHandler, useState} from 'react';
import useCharacters from "../../hooks/useCharacters.ts";
import usePosters from "../../hooks/usePosters.ts";
import useAccessories from "../../hooks/useAccessories.ts";
import {resetTeamSlot, selectTeamByIndex, setTitleWithIndex, TeamIndex} from "../teamBuilder/teamSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import TeamCharacterPreview from "./TeamCharacterPreview.tsx";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner} from "@material-tailwind/react";
import {IconRenderDetails} from "../../ui/GameItemIcon.tsx";
import useCopiedTeamContext from "./useCopiedTeamContext.ts";

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

    const [isOpenDialog, setIsOpenDialog] = useState(false);

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
                {slotsRenderPropsArray.map(slotsRenderProps => (
                    <TeamCharacterPreview {...slotsRenderProps} key={slotsRenderProps.characterId} />
                ))}
                <div className={'flex flex-col justify-between w-24'}>
                    <Button
                        variant={copiedTeamIndex === teamIndex ? 'filled' : 'outlined'}
                        color={copiedTeamIndex === teamIndex ? 'green' : 'gray'}
                        onClick={handleSetCopied}
                    >
                        Copy
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
                </div>
            </div>
        </div>
    );
};

export default TeamPreview;