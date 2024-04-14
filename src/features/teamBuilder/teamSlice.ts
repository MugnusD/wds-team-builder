import {createSelector, createSlice} from "@reduxjs/toolkit";
import {GameItemType} from "../tabs/selectTabsSlice.ts";

export type SlotIndex = 0 | 1 | 2 | 3 | 4;

type Slot = {
    character: {
        characterId: number,
        characterBase: string,
    },
    posterId: number,
    accessoryId: number,
    isLeader: boolean,
}

type State = {
    slots: Slot[],
    focusedItem: {
        slotIndex: SlotIndex,
        itemType: GameItemType
    } | null;
}

export type SwapPayload =
    | {
    id: number,
    type: 'poster' | 'accessory',
}
    | {
    id: number,
    characterBase: string,
    type: 'character'
}

const initialState: State = {
    slots: [
        {
            character: {
                characterId: 110010,
                characterBase: '鳳ここな',
            },
            posterId: 0,
            accessoryId: 0,
            isLeader: true,
        },
        {
            character: {
                characterId: 110020,
                characterBase: '静香',
            },
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            character: {
                characterId: 110030,
                characterBase: 'カトリナ・グリーベル',
            },
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            character: {
                characterId: 110040,
                characterBase: '新妻八恵',
            },
            posterId: 0,
            accessoryId: 0,
            isLeader: false,
        },
        {
            character: {
                characterId: 110050,
                characterBase: '柳場ぱんだ',
            },
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
            const {from, to} = action.payload;

            const temp = state.slots.at(from);
            state.slots[from] = state.slots.at(to) as Slot;
            state.slots[to] = temp as Slot;
        },
        setFocusedItem: (state, action: { payload: { slotIndex: SlotIndex, itemType: GameItemType } }) => {
            const {slotIndex, itemType} = action.payload;
            // If try to focus the focused item, defocus it
            if (slotIndex === state.focusedItem?.slotIndex && itemType === state.focusedItem?.itemType) {
                state.focusedItem = null;
            } else {
                state.focusedItem = {
                    slotIndex,
                    itemType
                };
            }
        },
        resetFocusItem: (state) => {
            state.focusedItem = null;
        },
        swapFocusItemFromTab: (state, action: { payload: SwapPayload }) => {
            let characterBase = '';
            const {id, type,} = action.payload;
            // If it is a character, it's characterBase is needed
            if (type === 'character') {
                characterBase = action.payload.characterBase;
            }
            const {focusedItem, slots} = state;

            if (focusedItem && focusedItem.itemType === type) {
                const focusSlot = slots.at(focusedItem.slotIndex) as Slot;

                switch (type) {
                    case "character": {
                        const sameCardIndex = slots.map(item => item.character.characterId).indexOf(id);
                        const sameCharIndex = slots.map(item => item.character.characterBase).indexOf(characterBase);

                        // If same character is already in team, first replace the card of same character
                        if (sameCharIndex > -1) {
                            state.slots[sameCharIndex].character.characterId = id;
                        }

                        // then swap slots.
                        // OR if the card is already in another slot, also swap slots (without replacing card)
                        if (sameCardIndex > -1 || sameCharIndex > -1) {
                            const index = sameCardIndex > -1 ? sameCardIndex : sameCharIndex;
                            const temp = state.slots.at(index);
                            state.slots[index] = state.slots.at(focusedItem.slotIndex) as Slot;
                            state.slots[focusedItem.slotIndex] = temp as Slot;
                            return
                        }

                        // swap from tabs
                        focusSlot.character = {characterId: id, characterBase};
                        break;
                    }
                    case 'poster': {
                        const index = slots.map(item => item.posterId).indexOf(id);

                        // swap between slots
                        if (index > -1) {
                            state.slots[index].posterId = focusSlot.posterId;
                            focusSlot.posterId = id;
                            return
                        }

                        // swap from tabs
                        focusSlot.posterId = id;
                        break;
                    }
                    case 'accessory': {
                        focusSlot.accessoryId = id;
                        break;
                    }
                }
            }
        },
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

// Return slot message
export const selectSlotByIndex = createSelector(
    [selectSlots, (_, index: SlotIndex) => index],
    (slots, index) => slots.at(index) as Slot,
)

// Return leader index
export const selectLeaderIndex = createSelector(
    [selectSlots],
    (slots) => slots.findIndex(item => item.isLeader),
)


