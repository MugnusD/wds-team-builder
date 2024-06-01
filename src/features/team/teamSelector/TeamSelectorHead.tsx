import {FC} from 'react';
import TeamSelector from "./TeamSelector.tsx";
import TeamPreviewButton from "./TeamPreviewButton.tsx";
import useBigScreenQuery from "../../../hooks/useBigScreenQuery.ts";

const TeamSelectorHead: FC = () => {
    const isBigScreen = useBigScreenQuery();

    return (
        <div className={'flex gap-3'}>
            <TeamSelector />
            {isBigScreen && <TeamPreviewButton />}
        </div>
    );
};

export default TeamSelectorHead;