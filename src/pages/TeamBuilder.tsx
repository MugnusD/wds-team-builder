import {FC} from 'react';
import TimelineBox from "../features/teamBuilder/TimelineBox.tsx";
import SelectTabs from "../features/tabs/SelectTabs.tsx";
import TeamSelectorHead from "../features/teamSelector/TeamSelectorHead.tsx";

const TeamBuilder: FC = () => {
    return (
        <div className={'flex flex-col items-center h-full gap-6'}>
            <TeamSelectorHead />
            <TimelineBox />
            <SelectTabs />
        </div>
    )
}

export default TeamBuilder;