import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		save: (prevState, action) => {
			return {
				...prevState,
				data: action.payload,
			};
		},
		remove: (prevState) => {
			return {
				...prevState,
				data: [],
			};
		},
	},
});

export const userAction = { ...userSlice.actions };
export default userSlice.reducer;
