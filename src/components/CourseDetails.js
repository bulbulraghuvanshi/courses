import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { RiArticleLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { CiCircleChevDown } from "react-icons/ci";
import { getCourse } from "../features/Courses/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoPlayCircleOutline } from "react-icons/io5";

const CourseDetails = () => {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const { CourseList } = useSelector((store) => store.courses);
	const courseDetail = CourseList.find((elm) => elm.id === courseId);
	const [isTopic, setTopic] = useState(null);
	console.log(courseDetail);

	const handleTopic = (index) => {
		isTopic === index ? setTopic(null) : setTopic(index);
	};
	useEffect(() => {
		dispatch(getCourse());
	}, []);

	useEffect(() => window.scrollTo(0, 0), []);

	return (
		// This is the main div
		<div className="relative flex flex-col h-screen " id="course-details-page">
			{/* THis div contains the content on the right side of the page such as enrollment, schedule,etc.  */}
			<div className="flex  gap-2 w-[22vw] bg-white p-6  border shadow-md max-[1000px]:static max-[1000px]:w-full flex-col  absolute top-[2rem] right-[14%] h-[90vh] z-[40px] max-[1200px]:w-[30vw] max-[1200px]:right-8">
				<div className=" h-44 w-full">
					<img src={courseDetail?.thumbnail} className=" h-full w-full"></img>
				</div>

				<div className=" max-[1000px]:flex-row flex flex-col max-[1000px]:gap-12">
					{/* Enrollment status whether open or close or In progress */}
					<div className="flex flex-col border border-black h-36 mt-10 min-w-max max-[1000px]:px-4 max-[1000px]:h-48 max-[1000px]:mt-8">
						<div className="flex justify-center items-center  text-2xl h-1/3 mt-3">
							Enrollment Status
						</div>
						<div className="flex h-3/4 justify-center items-center p-4">
							<div
								className={
									"flex border w-full h-3/4 justify-center items-center text-2xl  text-white cursor-pointer font-semibold " +
									(courseDetail?.enrollmentStatus?.toLowerCase() === "closed"
										? " bg-red-500"
										: courseDetail?.enrollmentStatus?.toLowerCase() === "open"
										? "bg-green-500"
										: "bg-yellow-500")
								}>
								{courseDetail?.enrollmentStatus}
							</div>
						</div>
					</div>

					{/* Schedule for the classes  */}
					<div className="flex flex-col h-48 w-full border mt-8 max-[1000px]:border-none">
						<div className="flex justify-center items-center  text-2xl h-1/3 ">
							Schedule
						</div>
						<div className="flex flex-col justify-center items-center gap-1 max-[720px]:text-sm">
							<div className="w-4/5">{courseDetail?.schedule}</div>
							{/* <div>Tuesday: 6:00pm - 9:00pm</div>
							<div>Thursday: 5:00pm - 7:00pm</div>
							<div>Friday: 5:00pm - 8:00pm</div> */}
						</div>
					</div>
				</div>
			</div>
			{/* This div contains the basic introduction about the course  */}
			<div className="flex px-48 items-center text-white h-72 bg-gray-900 max-[1000px]:px-10 max-[720px]:px-5 py-2 max-[1000px]:h-max max-[1200px]:px-10  ">
				<div className="relative flex flex-col p-10    gap-2">
					<div className="text-3xl font-bold mb-1 min-[900px]:w-3/4">
						{courseDetail?.name}
					</div>
					<div className="text-md font-semibold min-[900px]:w-2/3">
						{courseDetail?.description}
					</div>
					<div className="flex text-lg font-bold gap-2">
						Instructor :{" "}
						<p className="text-violet-300">{courseDetail?.instructor}</p>
					</div>
					<div className="flex flex-row gap-2 items-center font-bold text-yellow-500 text-sm">
						{courseDetail?.rating}
						<div className="flex ">
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
						</div>
						<div className="text-violet-300 text-xs underline">
							( {courseDetail?.ratingNo} ratings )
						</div>
					</div>
					<div className="text-sm">
						Course duration : {courseDetail?.duration}
					</div>
					{/* <div className="text-sm">No. of lectures: 56</div> */}
					<div className="text-sm">Location : {courseDetail?.location}</div>
				</div>
			</div>

			{/* This div contains the things after the heading in black background  */}
			<div className="flex  px-48   max-[720px]:px-5 max-[1000px]:p-10 max-[1200px]:px-10 ">
				{/* This div contains the content towrds the left half of the screen  */}
				<div
					className="flex flex-col w-2/3  p-10 gap-10 max-[1000px]:w-full"
					id="course-details-left">
					{/* This div includes the benefits provided in the course  */}
					<div className="flex flex-col h-max  w-full border pb-5">
						<div className="flex  w-full text-2xl py-4 px-6 font-bold  h-max">
							This course includes:
						</div>
						<div className="grid grid-cols-2 w-full px-6 py-2 gap-5 h-max max-[1000px]:grid-cols-1 ">
							{/* <div className="flex flex-col w-1/2 gap-2 "> */}
							<div className="flex flex-row justify-start items-center gap-3">
								<BiSolidVideos className="text-xl max-[1000px]:text-2xl" />
								<p>On-demand video lectures</p>
							</div>
							<div className="flex flex-row justify-start items-center gap-3">
								<FaMobileScreen className="text-xl max-[1000px]:text-2xl" />
								<p>Access on Mobile and PC</p>
							</div>
							<div className="flex flex-row justify-start items-center gap-3">
								<FaDownload className="text-xl max-[1000px]:text-2xl" />
								<p>Downloadable resources</p>
							</div>
							{/* </div> */}
							{/* <div className="flex flex-col h-2/3 w-1/2 gap-2"> */}
							<div className="flex flex-row justify-start items-center gap-3">
								<RiArticleLine className="text-xl max-[1000px]:text-2xl" />
								<p>Several Articles</p>
							</div>
							<div className="flex flex-row justify-start items-center gap-3">
								<FaTrophy className="text-xl max-[1000px]:text-2xl" />
								<p>Certificate of completion</p>
							</div>
							{/* </div> */}
						</div>
					</div>

					{/* this div contains about the prerequisites required for the course  */}
					<div className="flex flex-col h-max w-full border pb-5">
						<div className="flex h-1/3 w-full text-2xl py-4 px-6 font-bold max-[1000px]:h-max">
							Prerequisites:
						</div>
						<div className="flex flex-col  h-2/3 w-full px-6 py-2 gap-3">
							{courseDetail?.prerequisites?.map((elem, index) => {
								return (
									<div className="flex  gap-3 ">
										<TiTick className=" text-xl" />
										<p className="w-11/12">{elem}</p>
									</div>
								);
							})}
						</div>
					</div>

					{/* Course Content  starts from here */}
					<div className="flex flex-col w-full border pb-3">
						<div className="flex h-1/3 w-full text-2xl p-4 px-6 font-bold">
							Syllabus:
						</div>
						<div className="flex flex-col   w-full p-3 gap-3">
							{courseDetail?.syllabus?.map((elem, index) => {
								return (
									<>
										<div
											className="flex items-center gap-2 p-2 px-6 w-full text-xl font-bold border rounded-md cursor-pointer"
											onClick={() => handleTopic(index)}>
											<CiCircleChevDown
												className={`handleTopic ${
													isTopic === index ? "rotate-180" : ""
												}`}
											/>
											<div> Week {elem?.week}</div>
										</div>
										<div
											className={`handleTopic ${
												isTopic === index
													? "flex flex-col border py-4 px-10 gap-2"
													: "hidden"
											}`}>
											<div className="flex items-center gap-3">
												<div>
													<IoPlayCircleOutline />
												</div>
												<div>{elem?.topic}</div>
											</div>
											<div className="text-xs px-7">
												Content Covered: {elem?.content}
											</div>
										</div>
									</>
								);
							})}
						</div>
					</div>

					{/* Total lists of Students enrolled in the course  */}
					{/* <div className="flex flex-col w-full border pb-3">
						<div className="flex h-1/3 w-full text-2xl p-4 px-6 font-bold">
							Students Enrolled:
						</div>

						{/* Name and Email of the students  */}
					{/* <div className="flex flex-col   w-full p-3 gap-3">
							<div className="flex flex-col justify-center p-2 px-6 w-full text-xl border rounded-md ">
								<div className="flex gap-3 text-lg">
									<div>1.</div>
									<div>Alice Johnson</div>
								</div>
								<div className="text-sm ml-6">Email: alice@example.com</div>
							</div>
							<div className="flex flex-col justify-center p-2 px-6 w-full text-xl border rounded-md ">
								<div className="flex gap-3 text-lg">
									<div>2.</div>
									<div>Bob Smith</div>
								</div>
								<div className="text-sm ml-6">Email: bob@example.com</div>
							</div>
							<div className="flex flex-col justify-center p-2 px-6 w-full text-xl border rounded-md ">
								<div className="flex gap-3 text-lg">
									<div>3.</div>
									<div>Shreya Singh</div>
								</div>
								<div className="text-sm ml-6">Email: shreya@example.com</div>
							</div>
						</div> */}
					{/* </div>  */}
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
