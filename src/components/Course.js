import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../features/Courses/CourseSlice";

const Course = () => {
	const dispatch = useDispatch();
	const { CourseList } = useSelector((store) => store.courses);
	console.log(CourseList);
	useEffect(() => {
		dispatch(getCourse());
	}, []);
	return (
		<div className="flex flex-col  w-full px-48 mt-7  max-[900px]:px-20 pb-20">
			<div className="flex h-14  w-full  text-2xl font-bold ">
				Our top picks for you...!!
			</div>
			<div className="flex flex-col gap-14  w-full py-7 ">
				{/* This div contains the name of course, instructor, etc, details  */}
				{/* Click on the div to show full details about the course  */}
				{CourseList?.map((elem, index) => {
					return (
						<Link
							to={`/course_details/${elem?.id}`}
							className="relative flex h-full w-full border-black border p-7 gap-9 hover:scale-105 transition-all ease-in-out duration-150  hover:cursor-pointer max-[720px]:flex-col">
							<div className="flex h-64 w-full  ">
								<img
									src={elem?.thumbnail}
									alt=""
									className="w-full rounded-md"
								/>
							</div>
							<div className=" flex flex-col  w-full h-full justify-between min-h-max ">
								<div className="flex flex-col  w-full">
									<div className="text-3xl font-bold mb-1 ">{elem?.name}</div>
									<div className="text-lg font-semibold">
										{elem?.description}
									</div>
									<div className="text-md font-bold">By {elem?.instructor}</div>
									<div>Course duration: {elem?.duration}</div>
									{/* <div>No. of lectures: 78</div> */}
									<div className="flex flex-row gap-2 items-center font-bold">
										{elem?.rating}
										<div className="flex text-yellow-700">
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
										</div>
									</div>
								</div>
								{/* <div className="h-28"></div> */}
								<div className="flex  font-bold text-2xl ">₹{elem?.price}</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Course;
