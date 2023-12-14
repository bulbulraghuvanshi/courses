import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataBase, db } from "../../config/Firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const initialState = {
	isLoadingEnrolledCourse: false,
	EnrolledCourseList: [],
	name: "",
	completedStatus: {},
};

//GET API
export const getEnrolledCourses = createAsyncThunk(
	"courseSlice/getEnrolledCourses",
	async (data, thunkAPI) => {
		const coursesEnrollCollectionRef = doc(db, "users", data);
		try {
			const data = await getDoc(coursesEnrollCollectionRef);
			console.log(data?.data());
			return data?.data();
		} catch (error) {
			if (error) {
				alert("Some Error Occured!");
			}
		}
	}
);

// put api
export const markCompleted = createAsyncThunk(
	"courseSlice/getEnrolledCourses",
	async (data, thunkAPI) => {
		const coursesEnrollCollectionRef = doc(db, "users", data?.email);

		try {
			const resp = await updateDoc(coursesEnrollCollectionRef, data?.data);
			console.log(resp?.data());
			return resp?.data();
		} catch (error) {
			if (error) {
				alert("Some Error Occured!");
			}
		}
	}
);

const EnrolledCoursesSlice = createSlice({
	name: "enrolledcourses",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getEnrolledCourses.fulfilled, (state, { payload }) => {
				// alert("course Successfully fetched!");

				state.isLoadingEnrolledCourse = false;
				state.EnrolledCourseList = payload?.coursesEnrolledList;
				state.completedStatus = payload?.coursesEnrolled;
				state.name = payload?.name;
			})
			.addCase(getEnrolledCourses.pending, (state) => {
				state.isLoadingEnrolledCourse = true;
			})
			.addCase(getEnrolledCourses.rejected, (state) => {
				state.isLoadingEnrolledCourse = false;
			});
	},
});

export default EnrolledCoursesSlice.reducer;
