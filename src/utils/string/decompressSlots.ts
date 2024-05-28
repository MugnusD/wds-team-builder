import {SlotType} from "../../features/team/teamSlice.ts";
import {characterBaseCodes} from "./characterBaseCode.ts";

export const decompressSlots = (compressedString: string): SlotType[]  => {
    const jsonString = atob(compressedString);
    const values: number[] = JSON.parse(jsonString);

    if (values.length !== 25) {
        throw new Error("Decompressed slots should be a length of 25 number array.");
    }

    const slots: SlotType[] = [];
    for (let i = 0; i < values.length; i += 5) {
        slots.push({
            character: {
                characterId: values[i],
                characterBase: characterBaseCodes.find(_ => _.id === values[i + 1])?.name ?? '鳳ここな',
            },
            posterId: values[i + 2],
            accessoryId: values[i + 3],
            isLeader: values[i + 4] === 1,
        });
    }

    return slots;
}