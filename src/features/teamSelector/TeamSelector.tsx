import {FC, useEffect, useState} from 'react';
import {Select, Option} from "@material-tailwind/react";
import {setTeamIndex, TeamIndex} from "../teamBuilder/teamSlice.ts";
import {useDispatch} from "react-redux";

const TeamSelector: FC = () => {
    const [value, setValue] = useState<TeamIndex>('team1');
    const dispatch = useDispatch();

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
                <Option value={'team1'}>Team 1</Option>
                <Option value={'team2'}>Team 2</Option>
                <Option value={'team3'}>Team 3</Option>
                <Option value={'team4'}>Team 4</Option>
                <Option value={'team5'}>Team 5</Option>
                <Option value={'team6'}>Team 6</Option>
            </Select>
        </div>
    );
};

export default TeamSelector;