import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import userSlice from "./user";

const reducers = combineReducers({
	auth: authSlice,
	user: userSlice,
});

export default reducers;
