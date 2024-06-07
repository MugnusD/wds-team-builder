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
    size?: 'normal' | 'large',
}> = ({characterId, characterDetail, posterDetail, posterId, accessoryDetail, accessoryId, isLeader, size = 'normal'}) => {
    return (
        <div className={'flex flex-col'}>
            <GameItemIcon id={characterId} detail={characterDetail} size={size === 'normal' ? 'large' : 'max'} isLeader={isLeader} />
            <div className={'flex justify-center'}>
                <GameItemIcon id={posterId} detail={posterDetail} size={size === 'normal' ? 'small' : 'large'} />
                <GameItemIcon id={accessoryId} detail={accessoryDetail} size={size === 'normal' ? 'small' : 'large'} />
            </div>
        </div>
    );
};

export default TeamCharacterPreview;