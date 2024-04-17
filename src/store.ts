import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {teamReducer} from "./features/teamBuilder/teamSlice.ts";
import {selectedGameItemReducer} from "./features/tabs/selectTabsSlice.ts";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['team']
};

const rootReducer = combineReducers({
    team: teamReducer,
    selectedGameItem: selectedGameItemReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store)