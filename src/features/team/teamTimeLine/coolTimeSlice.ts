import {createSlice} from "@reduxjs/toolkit";

export type CoolTimeSliceState = {
    coolTimes: number[];
}

const initialState: CoolTimeSliceState = {
    coolTimes: [0, 0, 0, 0, 0],
};

const coolTimeSlice = createSlice({
    name: 'coolTime',
    initialState,
    reducers: {
        setCoolTime: (state, action: { payload: number[] }) => {
            state.coolTimes = action.payload;
        },
    },
    selectors: {
        selectCoolTime: sliceState => sliceState.coolTimes,
    }
});

export const coolTimeReducer = coolTimeSlice.reducer;
export const {setCoolTime} = coolTimeSlice.actions;
export const {selectCoolTime} = coolTimeSlice.selectors;