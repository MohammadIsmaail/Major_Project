import { combineReducers } from "@reduxjs/toolkit";
import authslice from "./slice/authslice";

const rootReducer=combineReducers({
    auth:authslice,
})

export default rootReducer