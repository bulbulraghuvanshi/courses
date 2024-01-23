import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../features/Courses/CourseSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const { CourseList } = useSelector((store) => store.courses);
	const [searchTerm, setSearchTerm] = useState("");

	const [isMenu, setMenu] = useState(false);
	const handleMenu = () => {
		isMenu === true ? setMenu(false) : setMenu(true);
	};

	const [isSearchItem, setSearchItem] = useState(false);
	const handleSearchItems = () => {
		isSearchItem === true ? setSearchItem(false) : setSearchItem(true);
	};

	const [isDesktop, setDesktop] = useState(window.innerWidth > 720);
	const updateMedia = () => {
		setDesktop(window.innerWidth > 720);
	};
	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	useEffect(() => {
		dispatch(getCourse());
	}, []);

	return (
		<>
			{/*  */}
			{/* // This is the main div    */}
			{isDesktop ? (
				<div id="nav-container" className="flex h-20 shadow-xl ">
					{/* This div contains the logo for the website  */}
					<div className="flex gap-3 w-1/6 mx-10  h-30 justify-center items-center font-bold ">
						<Link to="/" className="text-2xl text-violet-950  ">
							<strong className="text-4xl text-black ">A</strong>
							LEMENO
						</Link>
					</div>

					{/* This div contains the search bar  */}
					<div
						className="relative flex w-3/6  ml-10 h-30  justify-start items-center"
						id="nav-search"
						onMouseLeave={() => handleSearchItems(false)}
						onMouseEnter={() => handleSearchItems(true)}>
						<div
							className="flex items-center justify-center text-xl h-10 border-t border-l border-b rounded-l-3xl w-10 border-black"
							id="nav-search-icon">
							<FaSearch className="text-gray-500 pl-1" />
						</div>
						<input
							type="search"
							className="h-10 w-[30vw] outline-none px-1 pr-3 text-sm border-t border-r border-b rounded-r-3xl border-black"
							placeholder="Search..."
							id="nav-search-searchbar"
							onChange={(event) => {
								setSearchTerm(event.target.value);
							}}
							onClick={handleSearchItems}
						/>
						<div
							className={`handleSearchItems ${
								isSearchItem === true
									? "absolute flex flex-col gap-2 border bg-gray-100 rounded-lg min-h-max max-[1200px]:w-4/6 w-3/6 top-16 max-[1200px]:left-8 left-10 text-white p-4 z-50"
									: "hidden"
							}`}>
							{CourseList?.filter((val) => {
								if (searchTerm === "") {
									return val;
								} else if (
									val.name.toLowerCase().includes(searchTerm.toLowerCase())
								) {
									return val;
								} else if (
									val.instructor
										.toLowerCase()
										.includes(searchTerm.toLowerCase())
								) {
									return val;
								}
							}).map((elem, index) => {
								return (
									<Link to={`/course_details/${elem?.id}`}>
										<p className="text-xs text-gray-800">{elem?.name}</p>
										<p className="text-xs text-gray-400">{elem?.instructor}</p>
									</Link>
								);
							})}
						</div>
					</div>

					{/* This div contains the links to student's dashboard page  */}
					<Link
						to={"/dashboard"}
						className="flex items-center justify-end font-semibold w-1/6 h-30 cursor-pointer"
						id="nav-dashboard">
						Student's Dashboard
					</Link>

					{/* This div contains the cart icon and the login/signup icons */}
					<div className="flex text-2xl justify-center items-center gap-14 w-1/6  h-30">
						<FaShoppingCart />
						<Link to="/login">
							<IoPersonSharp />
						</Link>
					</div>
				</div>
			) : (
				//for different screen sizes
				<div
					id="nav-container"
					className="flex h-20  shadow-xl justify-between items-center pr-5 ">
					{/* This div contains the logo for the website  */}
					<div className="relative flex gap-3 w-1/6 mx-10  h-30 justify-center items-center font-bold ">
						<div className="w-1/3 mx-4 ml-7 font-sans">
							<IoMenu
								className="text-4xl cursor-pointer"
								onClick={handleMenu}
							/>

							{/* menu on hover  */}
							<div
								className={`handleMenu ${
									isMenu === true
										? "absolute flex flex-col  h-32 w-36 bg-white rounded-xl shadow-md shadow-black px-4 z-50"
										: "hidden"
								}`}>
								<Link
									to="/login"
									className="flex gap-2 justify-start items-center h-1/3 text-black">
									<IoPersonSharp />
									<div className="text-xs">Log in/Sign up</div>
								</Link>
								<div className="flex gap-2 justify-start items-center h-1/3 text-black">
									<FaShoppingCart />
									<div className="text-xs">Your cart</div>
								</div>

								<Link
									to="/dashboard"
									className="flex justify-start gap-2 items-center h-1/3 text-black ">
									<RiDashboard3Fill />
									<div className="text-xs">Dashboard</div>
								</Link>
							</div>
						</div>
						<Link
							to="/"
							className="text-2xl text-violet-950  max-[450px]:text-sm">
							<strong className="text-4xl text-black max-[450px]:text-lg">
								A
							</strong>
							LEMENO
						</Link>
					</div>
					{/* This div contains the search bar  */}
					<div
						className="flex  h-max  justify-start items-center border rounded-3xl border-black px-5 max-[450px]:w-40"
						id="nav-search"
						onMouseLeave={() => handleSearchItems(false)}
						onMouseEnter={() => handleSearchItems(true)}>
						<div
							className="flex items-center justify-center text-xl h-10 mr-5 "
							id="nav-search-icon">
							<FaSearch className="text-gray-500 pl-1" />
						</div>
						<input
							type="search"
							className="h-10 w-full outline-none pl-1  text-sm  rounded-r-3xl "
							placeholder="Search..."
							id="nav-search-searchbar"
							onChange={(event) => {
								setSearchTerm(event.target.value);
							}}
							onClick={handleSearchItems}
						/>
						<div
							className={`handleSearchItems ${
								isSearchItem === true
									? "absolute flex flex-col gap-2 rounded-lg border bg-gray-100 min-h-max top-16 right-10 text-white p-4 z-50  max-[600px]:right-8 max-[500px]:right-8next"
									: "hidden"
							}`}>
							{CourseList?.filter((val) => {
								if (searchTerm === "") {
									return val;
								} else if (
									val.name.toLowerCase().includes(searchTerm.toLowerCase())
								) {
									return val;
								} else if (
									val.instructor
										.toLowerCase()
										.includes(searchTerm.toLowerCase())
								) {
									return val;
								}
							}).map((elem, index) => {
								return (
									<Link to={`/course_details/${elem?.id}`} className="">
										<p className="text-xs text-gray-800">{elem?.name}</p>
										<p className="text-xs text-gray-400">{elem?.instructor}</p>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
