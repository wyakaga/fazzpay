import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import userSlice from "./user";
import transactionSlice from "./transaction";

const reducers = combineReducers({
	auth: authSlice,
	user: userSlice,
	transaction: transactionSlice
});

export default reducers;
