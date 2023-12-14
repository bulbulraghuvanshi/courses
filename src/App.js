import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Course from "./components/Course";
import Navbar from "./components/Navbar";
import CourseDetails from "./components/CourseDetails";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Course />} />
				<Route path="/course_details/:courseId" element={<CourseDetails />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<LogIn />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
