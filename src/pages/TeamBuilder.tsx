import {FC} from 'react';
import TeamSlots from "../features/team/teamSlot/TeamSlots.tsx";
import SelectTabs from "../features/tabs/SelectTabs.tsx";
import TeamSelectorHead from "../features/team/teamSelector/TeamSelectorHead.tsx";
import useBigScreenQuery from "../hooks/useBigScreenQuery.ts";
import TeamTimelines from "../features/team/teamTimeLine/TeamTimelines.tsx";
import {CurrentTeamContextProvider} from "../features/team/CurrentTeamContext.tsx";
import TimelineSettingButton from "../features/team/teamTimeLine/TimelineSettingButton.tsx";

const TeamBuilder: FC = () => {
    const isBigScreen = useBigScreenQuery();

    return (
        <div className={'flex flex-col items-center h-full gap-6'}>
            <CurrentTeamContextProvider>
                <div className={'flex gap-3'}>
                    <TeamSelectorHead />
                    <TimelineSettingButton />
                </div>
                <div className={'flex md:w-full'}>
                    <TeamSlots />
                    {isBigScreen && <TeamTimelines />}
                </div>
                {isBigScreen && <SelectTabs />}
            </CurrentTeamContextProvider>
        </div>
    );
};

export default TeamBuilder;