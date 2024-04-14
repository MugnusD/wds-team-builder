import {FC} from 'react';
import TimelineBox from "../features/teamBuilder/TimelineBox.tsx";
import SelectTabs from "../features/tabs/SelectTabs.tsx";

const TeamBuilder: FC = () => {
    return (
        <div className={'flex flex-col items-center h-full gap-6'}>
            <TimelineBox />
            <SelectTabs />
        </div>
    )
}

export default TeamBuilder;