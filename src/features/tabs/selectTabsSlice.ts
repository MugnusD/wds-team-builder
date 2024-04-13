import {createSelector, createSlice} from "@reduxjs/toolkit";
import {characterFilterRecord} from "../../types/characterName.ts";

export type GameItemType = 'character' | 'poster' | 'accessory';

export type SortBy = 'time' | 'rarity';

type State = {
    type: GameItemType,
    isDetailMode: boolean,
    cardSortFilter: {
        sortBy: SortBy
        filterByCharacter: Record<CharacterName, boolean>,
    }
}

const initialState: State = {
    type: 'character',
    isDetailMode: false,
    cardSortFilter: {
        sortBy: 'time',
        filterByCharacter: characterFilterRecord,
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
                 switchCardFilterByName
             } = selectedGameItemSlice.actions;
export const {selectGameItemType, selectISDetailMode, selectSortAndFilter} = selectedGameItemSlice.selectors;

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