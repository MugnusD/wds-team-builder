import {createSelector, createSlice} from "@reduxjs/toolkit";
import {GameItemType} from "../tabs/selectTabsSlice.ts";

export type SlotIndex = 0 | 1 | 2 | 3 | 4;

type Slot = {
    characterId: number,
    posterId: number,
    accessoryId: number,
    isLeader: boolean,
}

type State = {
    slots: Slot[],
    focusedItem: {
        slotIndex: SlotIndex,
        itemType: GameItemType,
    } | null;
}

const initialState: State = {
    slots: [
        {
            characterId: 110010,
            posterId: 0,
            accessoryId: 0,
            isLeader: true,
        },
        {
            characterId: 110020,
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            characterId: 110030,
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            characterId: 110040,
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            characterId: 110050,
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        }],
    focusedItem: null,
}

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setAsLeader: (state, action: { payload: SlotIndex }) => {
            state.slots.forEach(item => item.isLeader = false);
            state.slots[action.payload].isLeader = true;
        },
        swapSlot: (state, action: { payload: { from: SlotIndex, to: SlotIndex } }) => {
            const {
                      from,
                      to
                  } = action.payload;

            const temp = state.slots.at(from);
            state.slots[from] = state.slots.at(to) as Slot;
            state.slots[to] = temp as Slot;
        },
        setFocusedItem: (state, action: { payload: { slotIndex: SlotIndex, itemType: GameItemType } }) => {
            const {
                      slotIndex,
                      itemType
                  } = action.payload;
            if (state.focusedItem === null || slotIndex !== state.focusedItem.slotIndex || itemType !== state.focusedItem.itemType) {
                state.focusedItem = {
                    slotIndex,
                    itemType
                };
            } else if (slotIndex === state.focusedItem.slotIndex && itemType === state.focusedItem.itemType) {
                state.focusedItem = null;
            }
        },
        resetFocusItem: (state) => {
            state.focusedItem = null;
        },
        swapFocusItemFromTab: (state, action: { payload: { id: number, type: GameItemType } }) => {
            const {
                      id,
                      type
                  } = action.payload;
            const {
                      focusedItem,
                      slots
                  } = state;

            if (focusedItem && focusedItem.itemType === type) {
                const focusSlot = slots.at(focusedItem.slotIndex) as Slot;

                switch (type) {
                    case "character": {
                        const index = slots.map(item => item.characterId).indexOf(id);

                        if (index > -1) {
                            const temp = state.slots.at(index);
                            state.slots[index] = state.slots.at(focusedItem.slotIndex) as Slot;
                            state.slots[focusedItem.slotIndex] = temp as Slot;
                            return
                        }

                        focusSlot.characterId = id;
                        break;
                    }
                    case 'poster': {
                        focusSlot.posterId = id;
                        break;
                    }
                    case 'accessory': {
                        focusSlot.accessoryId = id;
                        break;
                    }
                }
            }
        }
    },
    selectors: {
        selectSlots: sliceState => sliceState.slots,
        selectFocusedItem: sliceState => sliceState.focusedItem,
    }
});

export const teamReducer = teamSlice.reducer;
export const {
                 setAsLeader,
                 swapSlot,
                 setFocusedItem,
                 resetFocusItem,
                 swapFocusItemFromTab
             } = teamSlice.actions;
export const {
                 selectSlots,
                 selectFocusedItem
             } = teamSlice.selectors;

export const selectSlotByIndex = createSelector(
    [selectSlots, (_, index: SlotIndex) => index],
    (slots, index) => slots.at(index) as Slot,
)

export const selectLeaderIndex = createSelector(
    [selectSlots],
    (slots) => slots.findIndex(item => item.isLeader),
)
