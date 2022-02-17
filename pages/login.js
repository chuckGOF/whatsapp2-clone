/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
	const signIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="grid place-items-center h-screen bg-gray-200">
			<Head>
				<title>Login</title>
			</Head>

			<div className="flex flex-col p-28 bg-white rounded-md shadow-2xl">
				<img
					className="h-52 w-52 mb-12"
					src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
					alt=""
				/>
				<button
					onClick={signIn}
					className="border bg-green-500 p-2 rounded-md text-white "
				>
					Sign in with Google
				</button>
			</div>
		</div>
	);
}

export default Login;
