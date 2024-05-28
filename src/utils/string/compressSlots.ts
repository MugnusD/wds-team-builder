import {SlotType} from "../../features/team/teamSlice.ts";
import {characterBaseCodes} from "./characterBaseCode.ts";

export const compressSlots = (slots: SlotType[]): string => {
    const values = slots.map(slot => [
        slot.character.characterId,
        characterBaseCodes.find(_ => _.name === slot.character.characterBase)?.id ?? 101,
        slot.posterId,
        slot.accessoryId,
        slot.isLeader ? 1 : 0
    ]).flat();

    console.log(values.length);

    const jsonString = JSON.stringify(values);
    const base64String = btoa(jsonString);

    return base64String;
}
