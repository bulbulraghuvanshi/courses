import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import CourseSlice from "./features/Courses/CourseSlice";
import storage from "redux-persist/lib/storage";
import UserSlice from "./features/user/UserSlice";
import EnrolledCoursesSlice from "./features/EnrolledCourses/EnrolledCoursesSlice";

const persitConfig = {
	key: "root",
	version: 1,
	storage,
};

const reducer = combineReducers({
	courses: CourseSlice,
	users: UserSlice,
	enrolledCourses: EnrolledCoursesSlice,
});

const persistedReducer = persistReducer(persitConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
});
