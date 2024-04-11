import {FC} from 'react';
import TimelineBox from "../features/teamBuilder/TimelineBox.tsx";
import {BoxWithHandle} from "../BoxWithHandler.tsx";

const TeamBuilder: FC = () => {
    return (
        <>
            <TimelineBox />
            <BoxWithHandle />
        </>
    )
}

export default TeamBuilder;