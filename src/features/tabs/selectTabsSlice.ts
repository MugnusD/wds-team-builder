import {createSlice} from "@reduxjs/toolkit";

export type GameItemType = 'character' | 'poster' | 'accessory' ;

type State = {
    type: GameItemType,
}

const initialState: State = {
    type: 'character',
}

const selectedGameItemSlice = createSlice({
    name: 'selectedGameItem',
    initialState,
    reducers: {
        setTabType: (state, action: {payload: GameItemType}) => {
            state.type = action.payload;
        }
    },
    selectors: {
        selectGameItemType: sliceState => sliceState.type,
    },
})

export const selectedGameItemReducer = selectedGameItemSlice.reducer;
export const {setTabType} = selectedGameItemSlice.actions;
export const {selectGameItemType} = selectedGameItemSlice.selectors;