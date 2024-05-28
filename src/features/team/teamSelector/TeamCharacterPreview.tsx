import {FC} from 'react';
import GameItemIcon, {IconRenderDetails} from "../../../ui/GameItemIcon.tsx";

const TeamCharacterPreview: FC<{
    characterId: number,
    characterDetail: IconRenderDetails,
    posterId: number,
    posterDetail: IconRenderDetails,
    accessoryId: number,
    accessoryDetail: IconRenderDetails,
    isLeader: boolean,
}> = ({characterId, characterDetail, posterDetail, posterId, accessoryDetail, accessoryId, isLeader}) => {
    return (
        <div className={'flex flex-col'}>
            <GameItemIcon id={characterId} detail={characterDetail} size={'big'} isLeader={isLeader} />
            <div className={'flex'}>
                <GameItemIcon id={posterId} detail={posterDetail} size={'small'} />
                <GameItemIcon id={accessoryId} detail={accessoryDetail} size={'small'} />
            </div>
        </div>
    );
};

export default TeamCharacterPreview;