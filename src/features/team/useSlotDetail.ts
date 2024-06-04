import {selectSlotByIndex, SlotIndex} from "./teamSlice.ts";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const useSlotDetail = (slotIndex: SlotIndex, characters: CharacterDetail[] | undefined, posters: PosterDetail[] | undefined, accessories: AccessoryDetail[] | undefined) => {
    const {
              character: {
                  characterId,
              },
              posterId,
              accessoryId,
              isLeader,
          } = useSelector(state => selectSlotByIndex(state, slotIndex));

    const [characterDetail, setCharacterDetail] = useState<CharacterDetail>();
    useEffect(() => {
        if (characterId && characters) {
            const character = characters?.find(character => character.id === characterId) ?? {} as CharacterDetail;
            setCharacterDetail(character);
        }
    }, [characterId, characters]);

    const [posterDetail, setPosterDetail] = useState<PosterDetail>();
    useEffect(() => {
        if (posterId !== 0 && posters) {
            const poster = posters?.find(poster => poster.id === posterId) ?? {} as PosterDetail;
            setPosterDetail(poster);
        }
        if (posterId === 0) {
            setPosterDetail(undefined);
        }
    }, [posterId, posters]);

    const [accessoryDetail, setAccessoryDetail] = useState<AccessoryDetail>();
    useEffect(() => {
        if (accessoryId !== 0 && accessories) {
            const accessory = accessories?.find(accessory => accessory.id === accessoryId) ?? {} as AccessoryDetail;
            setAccessoryDetail(accessory);
        }
        if (accessoryId === 0) {
            setAccessoryDetail(undefined);
        }
    }, [accessoryId, accessories]);

    return {
        characterDetail,
        posterDetail,
        accessoryDetail,
        isLeader,
    };
};

export default useSlotDetail;