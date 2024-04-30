import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import useCharacters from "../../hooks/useCharacters.ts";

const CardDetail: FC = () => {
    const {characters} = useCharacters();
    const {id} = useParams();
    const [titleName, setTitleName] = useState('');
    const [character, setCharacter] = useState<CharacterDetail>();

    useEffect(() => {
        if (!characters) return;
        const character = characters.find(item => item.id.toString() === id);

        if (!character) return;
        setTitleName(character.name);
        setCharacter(character);
    }, [characters, id]);


    useEffect(() => {
        if(titleName !== '') {
            document.title = titleName;
        }

        return () => {
            document.title = 'WDS Team Builder';
        }
    }, [titleName]);


    if (!characters || !character)
        return null;

    const {name, characterBase, sense: {descriptionsChinese}, starAct: {descriptionChinese: SaDesc}} = character;

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
                Star Act: {SaDesc}
            </Typography>
        </div>
    )
}

export default CardDetail;