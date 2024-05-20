import {FC} from 'react';
import useCharacters from "../../hooks/useCharacters.ts";
import usePosters from "../../hooks/usePosters.ts";
import useAccessories from "../../hooks/useAccessories.ts";
import {selectTeamByIndex, TeamIndex} from "../teamBuilder/teamSlice.ts";
import {useSelector} from "react-redux";
import TeamCharacterPreview from "./TeamCharacterPreview.tsx";
import {Spinner} from "@material-tailwind/react";
import {IconRenderDetails} from "../../ui/GameItemIcon.tsx";


const TeamPreview: FC<{
    teamIndex: TeamIndex,
}> = ({teamIndex}) => {
    const {characters, isLoading: isLoadingCharacter} = useCharacters();
    const {posters, isLoading: isLoadingPoster} = usePosters();
    const {accessories, isLoading: isLoadingAccessory} = useAccessories();

    const {slots, title} = useSelector(state => selectTeamByIndex(state, teamIndex));

    if (isLoadingAccessory || isLoadingCharacter || isLoadingPoster || !characters || !posters || !accessories) {
        return <Spinner />;
    }

    const slotsRenderPropsArray = slots.map(slot => {
        const {character: {characterId}, posterId, accessoryId} = slot;

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
        };
    });

    return (
        <div className={'flex flex-col'}>
            <div>Title: {title}</div>
            <div className={'flex gap-3'} key={teamIndex}>
                {slotsRenderPropsArray.map(slotsRenderProps => (
                    <TeamCharacterPreview {...slotsRenderProps} />
                ))}
            </div>
        </div>
    );
};

export default TeamPreview;