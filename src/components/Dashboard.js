import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../features/EnrolledCourses/EnrolledCoursesSlice";

const Dashboard = () => {
	const { user } = useSelector((store) => store.users);
	const { CourseList } = useSelector((store) => store.courses);
	const { completedStatus, name, EnrolledCourseList } = useSelector(
		(store) => store.enrolledCourses
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showComplete, setComplete] = useState(false);
	const [isComplete, markComplete] = useState(false);

	const handleComplete = (id) => {
		showComplete ? setComplete(false) : setComplete(id);
	};

	const handleMark = () => {
		isComplete === true ? markComplete(false) : markComplete(true);
	};

	const Navigate = useNavigate();
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!user?.email) {
			navigate("/login");
		} else dispatch(getEnrolledCourses(user?.email));
	}, []);
	return (
		// Main div
		<div className="flex flex-col h-screen">
			{/* This div contains the name dashboard */}
			<div className="flex min-h-[140px] bg-gray-900 w-full text-white justify-start items-center text-5xl font-semibold px-60   max-[1200px]:px-28 max-[900px]:px-36 max-[720px]:px-20">
				Dashboard
			</div>

			<div className="flex px-48 h-full max-[720px]:px-10 max-[900px]:px-28 max-[1200px]:px-20">
				<div className="grid grid-cols-4 w-full p-10 gap-4 gap-y-8 max-[720px]:grid-cols-2 max-[900px]:grid-cols-2  ">
					{/* This div contains the image,course,instructor,etc. to be displayed  */}

					{EnrolledCourseList?.map((elem, index) => {
						const data = CourseList.find((element) => {
							console.log();
							return elem === element?.id;
						});

						return (
							<div
								className="relative flex flex-col h-80 bg-white w-[95%]   gap-1 p-3 shadow-md "
								key={index}>
								<img
									src={data?.thumbnail}
									className="h-2/3  mb-2 cursor-pointer"
									onClick={() => Navigate(`/course_details/${data?.id}`)}></img>
								<div className=" font-bold">{data?.name}</div>
								<div className=" text-xs text-gray-700">{data?.instructor}</div>
								<div className="flex  w-full ">
									<div className="border w-1/3 border-purple-600"></div>
									<div className="border w-1/3"></div>
									<div className="border w-1/3"></div>
								</div>
								<div className=" text-xs">40% complete</div>
								<div className=" text-xs">Duration: {data?.duration}</div>

								<div className="absolute flex justify-center items-center text-2xl h-10 w-10  top-3 right-3 text-white z-30">
									<IoMdCheckmarkCircleOutline
										className={`handleMark ${
											completedStatus[data?.id] ? "hidden" : "cursor-pointer "
										}`}
										// onMouseEnter={handleComplete}
										onMouseEnter={() => handleComplete(data?.id)}
										onMouseLeave={() => handleComplete(data?.id)}
										onClick={handleMark}
									/>
									<IoCheckmarkDoneCircle
										className={`handleMark ${
											completedStatus[data?.id]
												? "cursor-pointer text-3xl text-green-600"
												: "hidden"
										}`}
										onClick={handleMark}
									/>

									<div
										className={`handleComplete ${
											showComplete === data?.id
												? "flex justify-center items-center absolute text-xs h-6 w-28  text-white bg-black top-8 rounded-lg mt-2 transition-all ease-in-out duration-75"
												: "hidden"
										}`}>
										Mark as complete
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
