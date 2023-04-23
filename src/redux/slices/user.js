import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	phoneNumber: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		savePhone: (prevState, action) => {
			return {
				...prevState,
				phoneNumber: action.payload,
			};
		},
	},
});

export const userAction = { ...userSlice.actions };
export default userSlice.reducer;
