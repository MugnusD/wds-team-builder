import {createSelector, createSlice} from "@reduxjs/toolkit";
import {characterFilterRecord} from "../../types/characterName.ts";
import {characterRarityRecord} from "../../types/characterRarity.ts";

export type GameItemType = 'character' | 'poster' | 'accessory';

export type SortBy = 'time' | 'rarity';

type State = {
    type: GameItemType,
    isDetailMode: boolean,
    cardSortFilter: {
        sortBy: SortBy
        filterByCharacter: Record<CharacterName, boolean>,
        filterByRarity: Record<CharacterRarity, boolean>,
    }
}

const initialState: State = {
    type: 'character',
    isDetailMode: false,
    cardSortFilter: {
        sortBy: 'time',
        filterByCharacter: characterFilterRecord,
        filterByRarity: characterRarityRecord,
    }
}

const selectedGameItemSlice = createSlice({
    name: 'selectedGameItem',
    initialState,
    reducers: {
        setTabType: (state, action: { payload: GameItemType }) => {
            state.type = action.payload;
        },
        switchDetailMode: (state) => {
            state.isDetailMode = !state.isDetailMode;
        },
        setCardSortBy: (state, action: { payload: SortBy }) => {
            state.cardSortFilter.sortBy = action.payload;
        },
        switchCardFilterByName: (state, action: { payload: CharacterName }) => {
            const name = action.payload;
            state.cardSortFilter.filterByCharacter[name] = !state.cardSortFilter.filterByCharacter[name];
        },
        switchCardFilterByRarity: (state, action: { payload: CharacterRarity }) => {
            const rarity = action.payload;
            state.cardSortFilter.filterByRarity[rarity] = !state.cardSortFilter.filterByRarity[rarity];
        }
    },
    selectors: {
        selectGameItemType: sliceState => sliceState.type,
        selectISDetailMode: sliceState => sliceState.isDetailMode,
        selectSortAndFilter: sliceState => sliceState.cardSortFilter,
    },
})

export const selectedGameItemReducer = selectedGameItemSlice.reducer;
export const {
                 setTabType,
                 switchDetailMode,
                 setCardSortBy,
                 switchCardFilterByName,
                 switchCardFilterByRarity
             } = selectedGameItemSlice.actions;
export const {
                 selectGameItemType,
                 selectISDetailMode,
                 selectSortAndFilter
             } = selectedGameItemSlice.selectors;

export const selectCardNameFilterArray = createSelector(
    [selectSortAndFilter],
    (sortAndFilter) => {
        const filterArray: CharacterName[] = [];
        for (const [name, chosen] of Object.entries(sortAndFilter.filterByCharacter)) {
            if (chosen)
                // Apparently name is an instance of CharacterName
                filterArray.push(name as CharacterName);
        }
        return filterArray;
    }
);

export const selectCardRarityFilterArray = createSelector(
    [selectSortAndFilter],
    (sortAndFilter) => {
        const filterArray: CharacterRarity[] = [];
        for (const [rarity, chosen] of Object.entries(sortAndFilter.filterByRarity)) {
            if (chosen)
                // Apparently name is an instance of CharacterName
                filterArray.push(rarity as CharacterRarity);
        }
        return filterArray;
    }
);