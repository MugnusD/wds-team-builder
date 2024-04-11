import {createSelector, createSlice} from "@reduxjs/toolkit";

export type SlotIndex = 0 | 1 | 2 | 3 | 4 ;

type Slot = {
    characterId: number,
    posterId: number,
    accessoryId: number,
}

type State = {
    leaderIndex: SlotIndex,
    slots: Slot[],
}

const initialState: State = {
    slots: [
        {
            characterId: 110010,
            posterId: 0,
            accessoryId: 0,
        },
        {
            characterId: 110020,
            posterId: 0,
            accessoryId: 0,
        },
        {
            characterId: 110030,
            posterId: 0,
            accessoryId: 0,
        },
        {
            characterId: 110040,
            posterId: 0,
            accessoryId: 0,
        },
        {
            characterId: 110050,
            posterId: 0,
            accessoryId: 0,
        }],
    leaderIndex: 0,
}

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setAsLeader: (state, action: { payload: SlotIndex }) => {
            state.leaderIndex = action.payload;
        }
    },
    selectors: {
        selectSlots: sliceState => sliceState.slots,
        selectLeaderIndex: sliceState => sliceState.leaderIndex,
    },
});

export const teamReducer = teamSlice.reducer;
export const {setAsLeader} = teamSlice.actions;
export const {selectSlots, selectLeaderIndex} = teamSlice.selectors;

export const selectSlotByIndex = createSelector(
    [selectSlots, (_, index: SlotIndex) => index],
    (slots, index) => slots.at(index) as Slot,
)
