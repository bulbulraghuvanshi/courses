import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/Firebase";

const initialState = {
	isLoadingUser: false,
	user: {},
};
// const coursesCollectionRef = collection(DataBase, "Courses");

//GET API
export const getUser = createAsyncThunk(
	"userSlice/getUser",
	async (data, thunkAPI) => {
		try {
			const resp = await signInWithEmailAndPassword(
				auth,
				data?.email,
				data?.password
			);
			return resp;
		} catch (error) {
			if (error) {
				alert("Some Error Occured!");
			}
		}
	}
);

//POST APi
export const postUser = createAsyncThunk(
	"userSlice/postUser",
	async (data, thunkAPI) => {
		try {
			const resp = await createUserWithEmailAndPassword(
				auth,
				data?.email,
				data?.password
			);
			return resp?.user;
		} catch (error) {
			if (error) {
				alert("Some Error Occured!");
			}
		}
	}
);

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logOutUser: (state) => {
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.fulfilled, (state, { payload }) => {
				alert("Logged In Succesfully!");

				state.isLoadingUser = false;
				state.user = payload?.user;
			})
			.addCase(getUser.pending, (state) => {
				state.isLoadingUser = true;
			})
			.addCase(getUser.rejected, (state) => {
				state.isLoadingUser = false;
			});
	},
});

export const { logOutUser } = UserSlice.actions;
export default UserSlice.reducer;
