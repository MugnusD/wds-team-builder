import {createSlice} from "@reduxjs/toolkit";

export type GameItemType = 'character' | 'poster' | 'accessory' ;

type State = {
    type: GameItemType,
    isDetailMode: boolean,
}

const initialState: State = {
    type: 'character',
    isDetailMode: false,
}

const selectedGameItemSlice = createSlice({
    name: 'selectedGameItem',
    initialState,
    reducers: {
        setTabType: (state, action: {payload: GameItemType}) => {
            state.type = action.payload;
        },
        switchDetailMode: (state) => {
            state.isDetailMode = !state.isDetailMode;
        }
    },
    selectors: {
        selectGameItemType: sliceState => sliceState.type,
        selectISDetailMode: sliceState => sliceState.isDetailMode,
    },
})

export const selectedGameItemReducer = selectedGameItemSlice.reducer;
export const {setTabType, switchDetailMode} = selectedGameItemSlice.actions;
export const {selectGameItemType, selectISDetailMode} = selectedGameItemSlice.selectors;