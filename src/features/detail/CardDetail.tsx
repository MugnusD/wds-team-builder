import {FC} from 'react';
import {useParams} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import useCharacters from "../../hooks/useCharacters.ts";

const CardDetail: FC = () => {
    const {characters} = useCharacters();
    const {id} = useParams();

    if (!characters)
        return null;

    const character = characters.find(item => item.id.toString() === id);

    if (!character)
        return null;

    const {name, characterBase, sense: {descriptionsChinese}, starAct: {descriptionChinese: SADesc}} = character;

    return (
        <div className={'flex-col'}>
            <Typography>
                Card ID: {id}
            </Typography>
            <Typography>
                Character Base Name: {characterBase}
            </Typography>
            <Typography>
                Card Name: {name}
            </Typography>
            <Typography>
                Sense: {descriptionsChinese}
            </Typography>
            <Typography>
                Star Act: {SADesc}
            </Typography>
        </div>
    )
}

export default CardDetail;