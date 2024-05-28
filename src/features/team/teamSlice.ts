import {createSelector, createSlice} from "@reduxjs/toolkit";
import {GameItemType} from "../tabs/selectTabsSlice.ts";

export type SlotIndex = 0 | 1 | 2 | 3 | 4;

export type SlotType = {
    character: {
        characterId: number,
        characterBase: string,
    },
    posterId: number,
    accessoryId: number,
    isLeader: boolean,
}

type TeamState = {
    slots: SlotType[],
    title: string,
}

export type TeamIndex = 'team1' | 'team2' | 'team3' | 'team4' | 'team5' | 'team6' | 'team7' | 'team8' | 'team9' | 'team10' | 'team11' | 'team12';

type TeamRecordState = Record<TeamIndex, TeamState>

export type TeamSliceState = {
    teams: TeamRecordState,
    currentTeamIndex: TeamIndex,
    focusedItem: {
        slotIndex: SlotIndex,
        itemType: GameItemType
    } | null,
}

export const slotsInitialState: SlotType[] = [
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
    }];

const initialState: TeamSliceState = {
    teams: {
        'team1': {
            title: 'Team 1',
            slots: slotsInitialState,
        },
        'team2': {
            title: 'Team 2',
            slots: slotsInitialState,
        },
        'team3': {
            title: 'Team 3',
            slots: slotsInitialState,
        },
        'team4': {
            title: 'Team 4',
            slots: slotsInitialState,
        },
        'team5': {
            title: 'Team 5',
            slots: slotsInitialState,
        },
        'team6': {
            title: 'Team 6',
            slots: slotsInitialState,
        },
        'team7': {
            title: 'Team 7',
            slots: slotsInitialState,
        },
        'team8': {
            title: 'Team 8',
            slots: slotsInitialState,
        },
        'team9': {
            title: 'Team 9',
            slots: slotsInitialState,
        },
        'team10': {
            title: 'Team 10',
            slots: slotsInitialState,
        },
        'team11': {
            title: 'Team 11',
            slots: slotsInitialState,
        },
        'team12': {
            title: 'Team 12',
            slots: slotsInitialState,
        },
    },
    currentTeamIndex: 'team1',
    focusedItem: null,
};

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

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeamIndex: (state, action: { payload: TeamIndex }) => {
            state.currentTeamIndex = action.payload;
        },
        setAsLeader: (state, action: { payload: SlotIndex }) => {
            const currentTeam = state.currentTeamIndex;
            state.teams[currentTeam].slots.forEach(item => item.isLeader = false);
            state.teams[currentTeam].slots[action.payload].isLeader = true;
        },
        setTitleWithIndex: (state, action: { payload: { name: string, index: TeamIndex } }) => {
            const {payload: {name, index}} = action;
            state.teams[index].title = name;
        },
        swapSlot: (state, action: { payload: { from: SlotIndex, to: SlotIndex } }) => {
            const {from, to} = action.payload;

            const currentTeam = state.currentTeamIndex;
            const temp = state.teams[currentTeam].slots.at(from);
            state.teams[currentTeam].slots[from] = state.teams[currentTeam].slots.at(to) as SlotType;
            state.teams[currentTeam].slots[to] = temp as SlotType;
        },
        setFocusedItem: (state, action: { payload: { slotIndex: SlotIndex, itemType: GameItemType } }) => {
            const {slotIndex, itemType} = action.payload;
            // If try to focus the focused item, defocus it
            if (slotIndex === state.focusedItem?.slotIndex && itemType === state.focusedItem?.itemType) {
                state.focusedItem = null;
            } else {
                state.focusedItem = {
                    slotIndex,
                    itemType,
                };
            }
        },
        resetFocusItem: (state) => {
            state.focusedItem = null;
        },
        swapFocusItemFromTab: (state, action: { payload: SwapPayload }) => {
            let characterBase = '';
            const {id, type} = action.payload;
            // If it is a character, it's characterBase is needed
            if (type === 'character') {
                characterBase = action.payload.characterBase;
            }
            const currentTeam = state.currentTeamIndex;
            const focusedItem = state.focusedItem;
            const slots = state.teams[currentTeam].slots;

            if (focusedItem && focusedItem.itemType === type) {
                const focusSlot = slots.at(focusedItem.slotIndex) as SlotType;

                switch (type) {
                    case "character": {
                        const sameCardIndex = slots.map(item => item.character.characterId).indexOf(id);
                        const sameCharIndex = slots.map(item => item.character.characterBase).indexOf(characterBase);

                        // If same character is already in team, first replace the card of same character
                        if (sameCharIndex > -1) {
                            slots[sameCharIndex].character.characterId = id;
                        }

                        // then swap slots.
                        // OR if the card is already in another slot, also swap slots (without replacing card)
                        if (sameCardIndex > -1 || sameCharIndex > -1) {
                            const index = sameCardIndex > -1 ? sameCardIndex : sameCharIndex;
                            const temp = slots.at(index);
                            slots[index] = slots.at(focusedItem.slotIndex) as SlotType;
                            slots[focusedItem.slotIndex] = temp as SlotType;
                            return;
                        }

                        // swap from tabs
                        focusSlot.character = {characterId: id, characterBase};
                        break;
                    }
                    case 'poster': {
                        // set to empty
                        if (id === 0) {
                            focusSlot.posterId = id;
                            return;
                        }

                        const index = slots.map(item => item.posterId).indexOf(id);

                        // swap between slots
                        if (index > -1) {
                            slots[index].posterId = focusSlot.posterId;
                            focusSlot.posterId = id;
                            return;
                        }

                        // swap from tabs
                        focusSlot.posterId = id;
                        return;
                    }
                    case 'accessory': {
                        focusSlot.accessoryId = id;
                        break;
                    }
                }
            }
        },
        copyTeam: (state, action: { payload: { src: TeamIndex, desc: TeamIndex } }) => {
            const {src, desc} = action.payload;
            state.teams[desc].slots = state.teams[src].slots;
        },
        resetTeamSlot: (state, action: { payload: TeamIndex }) => {
            state.teams[action.payload].slots = slotsInitialState;
        },
        setSlots: (state, action: {payload: {slots: SlotType[], index: TeamIndex}}) => {
            const {slots, index} = action.payload;
            state.teams[index].slots = slots;
        },
    },
    selectors: {
        selectSlots: sliceState => {
            const currentTeam = sliceState.currentTeamIndex;
            return sliceState.teams[currentTeam].slots;
        },
        selectFocusedItem: sliceState => sliceState.focusedItem,
        selectTeams: sliceState => sliceState.teams,
    },
});

export const teamReducer = teamSlice.reducer;
export const {
                 setAsLeader,
                 setTeamIndex,
                 swapSlot,
                 setFocusedItem,
                 resetFocusItem,
                 swapFocusItemFromTab,
                 setTitleWithIndex,
                 copyTeam,
                 resetTeamSlot,
                 setSlots,
             } = teamSlice.actions;
export const {
                 selectSlots,
                 selectFocusedItem,
                 selectTeams,
             } = teamSlice.selectors;

// Return slot message
export const selectSlotByIndex = createSelector(
    [selectSlots, (_, index: SlotIndex) => index],
    (slots, index) => slots.at(index) as SlotType,
);

// Return leader index
export const selectLeaderIndex = createSelector(
    [selectSlots],
    (slots) => slots.findIndex(item => item.isLeader),
);

export const selectTeamedCharacterIds = createSelector(
    [selectSlots],
    (slots) => slots.map(slot => slot.character.characterId),
);

export const selectTeamedPosterIds = createSelector(
    [selectSlots],
    (slots) => slots.map(slot => slot.posterId),
);

export const selectTeamedAccessoryIds = createSelector(
    [selectSlots],
    (slots) => slots.map(slot => slot.accessoryId),
);

export const selectTeamByIndex = createSelector(
    [selectTeams, (_, index: TeamIndex) => index],
    (teams, index) => teams[index],
);