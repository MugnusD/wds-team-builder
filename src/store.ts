import {configureStore} from "@reduxjs/toolkit";
import {teamReducer} from "./features/teamBuilder/teamSlice.ts";
import {selectedGameItemReducer} from "./features/tabs/selectTabsSlice.ts";

const store = configureStore({
    reducer: {
        team: teamReducer,
        selectedGameItem: selectedGameItemReducer,
    }
})

export default store;