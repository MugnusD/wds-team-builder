import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createTransform, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {slotsInitialState, TeamIndex, teamReducer, TeamSliceState} from "./features/team/teamSlice.ts";
import {selectedGameItemReducer, SelectTabsSliceState} from "./features/tabs/selectTabsSlice.ts";
import {timelineReducer, TimelineSliceState} from "./features/team/teamTimeLine/timelineSlice.ts";

interface RootState {
    team: TeamSliceState,
    selectedGameItem: SelectTabsSliceState,
    timeline: TimelineSliceState,
}

const teamTransform = createTransform<TeamSliceState, TeamSliceState>(
    (inboundState) => {
        return inboundState;
    },
    (outboundState) => {
        const teams = outboundState.teams;
        const teamIndexes: TeamIndex[] = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8', 'team9', 'team10', 'team11', 'team12'];

        teamIndexes.forEach(index => {
            if (!teams[index]) {
                teams[index] = {
                    title: 'Team ' + index.slice(4),
                    slots: slotsInitialState,
                };
            }
        });

        return {...outboundState, teams};
    },
    {whitelist: ['team']},
);

const persistConfig = {
    key: 'root-v1',
    storage: storage,
    whitelist: ['team', 'timeline'],
    transforms: [teamTransform],
};

const rootReducer = combineReducers({
    team: teamReducer,
    selectedGameItem: selectedGameItemReducer,
    timeline: timelineReducer,
});

// persist team slice to local storage
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);