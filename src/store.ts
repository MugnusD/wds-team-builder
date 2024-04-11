import {configureStore} from "@reduxjs/toolkit";
import {teamReducer} from "./features/teamBuilder/teamSlice.ts";

const store = configureStore({
    reducer: {
        team: teamReducer,
    }
})

export default store;