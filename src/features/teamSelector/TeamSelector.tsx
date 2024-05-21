import {FC, useEffect, useState} from 'react';
import {Select, Option} from "@material-tailwind/react";
import {selectTeams, setTeamIndex, TeamIndex} from "../teamBuilder/teamSlice.ts";
import {useDispatch, useSelector} from "react-redux";

const TeamSelector: FC = () => {
    const [value, setValue] = useState<TeamIndex>('team1');
    const dispatch = useDispatch();
    const teams = useSelector(selectTeams);

    useEffect(() => {
        dispatch(setTeamIndex(value));
    }, [dispatch, value]);

    return (
        <div className="w-72">
            <Select
                label="Select Team"
                value={value}
                onChange={(val) => setValue(val as TeamIndex)}
            >
                    <Option value={'team1'}>{teams['team1'].title}</Option>
                    <Option value={'team2'}>{teams['team2'].title}</Option>
                    <Option value={'team3'}>{teams['team3'].title}</Option>
                    <Option value={'team4'}>{teams['team4'].title}</Option>
                    <Option value={'team5'}>{teams['team5'].title}</Option>
                    <Option value={'team6'}>{teams['team6'].title}</Option>
            </Select>
        </div>
    );
};

export default TeamSelector;