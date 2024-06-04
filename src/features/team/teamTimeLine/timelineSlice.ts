import {createSelector, createSlice} from "@reduxjs/toolkit";
import {SlotIndex} from "../teamSlice.ts";

export type TimelineSliceState = {
    timeline: Record<SlotIndex, number[]>,
    length: number,
}

const initialState: TimelineSliceState = {
    timeline: {
        0: [10, 80],
        1: [20, 70],
        2: [30, 60],
        3: [40],
        4: [50],
    },
    length: 90,
};

const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        setTimelineState: (state, action: {payload: TimelineSliceState}) => {
            const {length, timeline} = action.payload;

/*            let validated = true;

            Object.values(timeline).forEach(times => times.forEach(time => {
                console.log(`${time} > ${length}`)
                if(time > length) {
                    validated = false;
                }
            }))

            if (!validated) {
                return;
            }*/

            state.length = length;
            state.timeline = timeline;
        }
    },
    selectors: {
        selectLength: sliceState => sliceState.length,
        selectTimeline: sliceState => sliceState.timeline,
    },
});

export const timelineReducer = timelineSlice.reducer;
export const {setTimelineState} = timelineSlice.actions;
export const {selectTimeline, selectLength} = timelineSlice.selectors;

export const selectSensePosition = createSelector(
    [selectTimeline],
    (timeline) => {
        const sensePosition: { index: SlotIndex | -1, time: number }[] = [];
        sensePosition.push({index: -1, time: 0});

        for (const [index , times] of Object.entries(timeline)) {
            times.forEach(time => sensePosition.push({index: (Number(index) as SlotIndex), time: time}));
        }

        return sensePosition;
    },
);


