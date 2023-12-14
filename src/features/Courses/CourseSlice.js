import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataBase } from "../../config/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const initialState = {
	isLoadingCourse: false,
	CourseList: [],
};
const coursesCollectionRef = collection(DataBase, "Courses");

//GET API
export const getCourse = createAsyncThunk(
	"courseSlice/getCourse",
	async (thunkAPI) => {
		try {
			const data = await getDocs(coursesCollectionRef);
			console.log(data.docs);
			return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		} catch (error) {
			if (error) {
				alert("Some Error Occured!");
			}
		}
	}
);

const CourseSlice = createSlice({
	name: "courses",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getCourse.fulfilled, (state, { payload }) => {
				// alert("course Successfully fetched!");
				state.isLoadingCourse = false;
				state.CourseList = payload;
			})
			.addCase(getCourse.pending, (state) => {
				state.isLoadingCourse = true;
			})
			.addCase(getCourse.rejected, (state) => {
				state.isLoadingCourse = false;
			});
	},
});

export default CourseSlice.reducer;
