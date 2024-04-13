import {createSelector, createSlice} from "@reduxjs/toolkit";
import {characterNameFilterRecord} from "../../types/characterName.ts";
import {characterRarityFilterRecord} from "../../types/characterRarity.ts";
import {characterSenseTypeFilterRecord} from "../../types/characterSenseType.ts";

export type GameItemType = 'character' | 'poster' | 'accessory';

export type SortBy = 'time' | 'rarity';

type State = {
    type: GameItemType,
    isDetailMode: boolean,
    cardSortFilter: {
        sortBy: SortBy,
        filterByCharacter: Record<CharacterName, boolean>,
        filterByRarity: Record<CharacterRarity, boolean>,
        filterBySenseType: Record<SenseType, boolean>,
    }
}

const initialState: State = {
    type: 'character',
    isDetailMode: false,
    cardSortFilter: {
        sortBy: 'time',
        filterByCharacter: characterNameFilterRecord,
        filterByRarity: characterRarityFilterRecord,
        filterBySenseType: characterSenseTypeFilterRecord,
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
        },
        switchCardFilterBySenseType: (state, action: { payload: SenseType }) => {
            const senseType = action.payload;
            state.cardSortFilter.filterBySenseType[senseType] = !state.cardSortFilter.filterBySenseType[senseType];
        }
    },
    selectors: {
        selectGameItemType: sliceState => sliceState.type,
        selectISDetailMode: sliceState => sliceState.isDetailMode,
        selectCardSortAndFilter: sliceState => sliceState.cardSortFilter,
        selectCardFilterByName: sliceState => sliceState.cardSortFilter.filterByCharacter,
        selectCardFilterByRarity: sliceState => sliceState.cardSortFilter.filterByRarity,
        selectCardFilterBySenseType: sliceState => sliceState.cardSortFilter.filterBySenseType,
    },
})

export const selectedGameItemReducer = selectedGameItemSlice.reducer;
export const {
                 setTabType,
                 switchDetailMode,
                 setCardSortBy,
                 switchCardFilterByName,
                 switchCardFilterByRarity,
                 switchCardFilterBySenseType
             } = selectedGameItemSlice.actions;
export const {
                 selectGameItemType,
                 selectISDetailMode,
                 selectCardSortAndFilter,
                 selectCardFilterByName,
                 selectCardFilterBySenseType,
                 selectCardFilterByRarity
             } = selectedGameItemSlice.selectors;

export const selectCardNameFilterArray = createSelector(
    [selectCardFilterByName],
    (filteredName) => {
        const filterArray: CharacterName[] = [];
        for (const [name, chosen] of Object.entries(filteredName)) {
            if (chosen)
                // Apparently name is an instance of CharacterName
                filterArray.push(name as CharacterName);
        }
        return filterArray;
    }
);

export const selectCardRarityFilterArray = createSelector(
    [selectCardFilterByRarity],
    (filteredRarities) => {
        const filterArray: CharacterRarity[] = [];
        for (const [rarity, chosen] of Object.entries(filteredRarities)) {
            if (chosen)
                // Apparently rarity is an instance of CharacterRarity
                filterArray.push(rarity as CharacterRarity);
        }
        return filterArray;
    }
);

export const selectCardSenseTypeFilterArray = createSelector(
    [selectCardFilterBySenseType],
    (filteredSenseTypes) => {
        const filterArray: SenseType[] = [];
        for (const [senseType, chosen] of Object.entries(filteredSenseTypes)) {
            if (chosen)
                // Apparently senseType is an instance of SenseType
                filterArray.push(senseType as SenseType);
        }
        return filterArray;
    }
);