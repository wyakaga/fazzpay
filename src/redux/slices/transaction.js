import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	amount: 0,
	notes: "",
	time: "",
	receiverId: "",
};

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		saveAmount: (prevState, action) => {
			return {
				...prevState,
				amount: action.payload,
			};
		},
		saveNotes: (prevState, action) => {
			return {
				...prevState,
				notes: action.payload,
			};
		},
		saveTime: (prevState, action) => {
			return {
				...prevState,
				time: action.payload,
			};
		},
		saveId: (prevState, action) => {
			return {
				...prevState,
				receiverId: action.payload,
			};
		},
	},
});

export const transactionAction = { ...transactionSlice.actions };
export default transactionSlice.reducer;
