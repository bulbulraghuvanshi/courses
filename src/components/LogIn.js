import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOutUser, postUser } from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
	const navigate = useNavigate();
	const { user } = useSelector((store) => store.users);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("alice@example.com");
	const [password, setPassword] = useState("123456");

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "password") {
			setPassword(value);
		} else {
			setEmail(value);
		}
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			alert("Please fill out all the fields!!");
		} else {
			dispatch(getUser({ email: email, password: password }));
		}
	};

	// useEffect(() => {
	// 	if (user?.email) {
	// 		navigate("/");
	// 	}
	// }, [user]);
	return (
		<div className="relative flex justify-center items-center w-full border ">
			{user?.email ? (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(logOutUser());
					}}
					className="absolute flex flex-col w-fit border rounded-lg border-black p-10 top-36 text-2xl gap-4 ">
					<button
						type="submit"
						className="rounded-md mt-1 text-sm bg-blue-400 text-white p-4 uppercase">
						LOG Out
					</button>
				</form>
			) : (
				<form
					onSubmit={handleLogin}
					className="absolute flex flex-col w-fit border rounded-lg border-black p-10 top-36 text-2xl gap-4 ">
					<div>
						<div className="text-lg">Email ID</div>
						<input
							type="text"
							name="email"
							placeholder="Enter your email"
							className="border p-2 text-sm"
							onChange={handleChange}
							value={email}
						/>
					</div>
					<div>
						<div className="text-lg">Password</div>
						<input
							type="text"
							name="password"
							placeholder="Enter your email"
							className="border p-2 text-sm"
							onChange={handleChange}
							value={password}
						/>
					</div>
					<button
						type="submit"
						className="rounded-md mt-1 h-10 text-sm bg-blue-400 text-white">
						LOG IN
					</button>
				</form>
			)}
		</div>
	);
};

export default LogIn;
