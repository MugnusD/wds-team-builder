import {FC} from 'react';
import TeamSelector from "./TeamSelector.tsx";
import TeamPreviewButton from "./TeamPreviewButton.tsx";

const TeamSelectorHead: FC = () => {
    return (
        <div className={'flex gap-3'}>
            <TeamSelector />
            <TeamPreviewButton />
        </div>
    );
};

export default TeamSelectorHead;