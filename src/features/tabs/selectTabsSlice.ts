import {createSelector, createSlice} from "@reduxjs/toolkit";
import {characterNameFilterRecord} from "../../types/characterName.ts";
import {characterRarityFilterRecord} from "../../types/characterRarity.ts";
import {characterSenseTypeFilterRecord} from "../../types/characterSenseType.ts";
import {characterAttributeFilterRecord} from "../../types/characterAttribute.ts";

export type GameItemType = 'character' | 'poster' | 'accessory';

export type CharacterSortBy = 'time' | 'rarity' | 'name';

type CardSortFilter = {
    sortBy: CharacterSortBy,
    filterByCharacter: Record<CharacterName, boolean>,
    filterByRarity: Record<CharacterRarity, boolean>,
    filterBySenseType: Record<SenseType, boolean>,
    filterByAttributeType: Record<AttributeType, boolean>
}

export type PosterSortBy = 'time' | 'rarity';

type PosterSortFilter = {
    sortBy: PosterSortBy,
}

type State = {
    type: GameItemType,
    isDetailMode: boolean,
    cardSortFilter: CardSortFilter,
    posterSortFilter: PosterSortFilter,
}

const initialState: State = {
    type: 'character',
    isDetailMode: false,
    cardSortFilter: {
        sortBy: 'rarity',
        filterByCharacter: characterNameFilterRecord,
        filterByRarity: characterRarityFilterRecord,
        filterBySenseType: characterSenseTypeFilterRecord,
        filterByAttributeType: characterAttributeFilterRecord,
    },
    posterSortFilter: {
        sortBy: 'rarity',
    },
};

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
        setCardSortFilter: (state, action: { payload: CardSortFilter }) => {
            state.cardSortFilter = action.payload;
        },
        setPosterSortFilter: (state, action: { payload: PosterSortFilter }) => {
            state.posterSortFilter = action.payload;
        },
    },
    selectors: {
        selectGameItemType: sliceState => sliceState.type,
        selectIsDetailMode: sliceState => sliceState.isDetailMode,
        selectCardSortAndFilter: sliceState => sliceState.cardSortFilter,
        selectPosterSortAndFiler: sliceState => sliceState.posterSortFilter,
        // TODO: These should also be removed
        selectCardFilterByName: sliceState => sliceState.cardSortFilter.filterByCharacter,
        selectCardFilterByRarity: sliceState => sliceState.cardSortFilter.filterByRarity,
        selectCardFilterBySenseType: sliceState => sliceState.cardSortFilter.filterBySenseType,
        selectCardFilterByAttributeType: sliceState => sliceState.cardSortFilter.filterByAttributeType,
    },
});

export const selectedGameItemReducer = selectedGameItemSlice.reducer;
export const {
                 setTabType,
                 switchDetailMode,
                 setCardSortFilter,
                 setPosterSortFilter,
             } = selectedGameItemSlice.actions;
export const {
                 selectGameItemType,
                 selectIsDetailMode,
                 selectCardSortAndFilter,
                 selectCardFilterByName,
                 selectCardFilterBySenseType,
                 selectCardFilterByRarity,
                 selectCardFilterByAttributeType,
                 selectPosterSortAndFiler,
             } = selectedGameItemSlice.selectors;

// TODO: Preparing to remove these selectors, they were implemented for the re-usability of filtering, but now they are only used in one place and are no longer needed to be implemented specifically in the Slice file.
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
    },
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
    },
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
    },
);

export const selectCardAttributeTypeFilterArray = createSelector(
    [selectCardFilterByAttributeType],
    (filteredAttributeTypes) => {
        const filterArray: AttributeType[] = [];
        for (const [attributeType, chosen] of Object.entries(filteredAttributeTypes)) {
            if (chosen)
                // Apparently attributeType is an instance of AttributeType
                filterArray.push(attributeType as AttributeType);
        }
        return filterArray;
    },
);
