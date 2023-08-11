import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getDataById } from "@/utils/https/user";

const initialState = {
	data: [],
	isLoading: false,
	isRejected: false,
	isFulfilled: false,
	err: null,
};

export const getUserThunk = createAsyncThunk(
	"user/get",
	async ({ userId, token, controller }) => {
		try {
			const response = await getDataById(userId, token, controller);
			return response["data"]["data"]
		} catch (error) {
			console.log(error);
		}
	},
)

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(getUserThunk.pending, (prevState) => {
			return {
				...prevState,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
				err: null,
			};
		})
		.addCase(getUserThunk.fulfilled, (prevState, action) => {
			return {
				...prevState,
				isLoading: false,
				isFulfilled: true,
				data: action.payload,
			};
		})
		.addCase(getUserThunk.rejected, (prevState, action) => {
			return {
				...prevState,
				isLoading: false,
				isRejected: true,
				err: action.error.message,
			}
		})
	}
});

export const userAction = { ...userSlice.actions, getUserThunk };
export default userSlice.reducer;
