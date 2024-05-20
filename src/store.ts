import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {teamReducer} from "./features/teamBuilder/teamSlice.ts";
import {selectedGameItemReducer} from "./features/tabs/selectTabsSlice.ts";

const persistConfig = {
    key: 'root-v1',
    storage: storage,
    whitelist: ['team'],
};

const rootReducer = combineReducers({
    team: teamReducer,
    selectedGameItem: selectedGameItemReducer,
});

// persist team slice to local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);