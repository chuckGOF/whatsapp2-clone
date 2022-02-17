/* eslint-disable @next/next/no-img-element */
import React from "react";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../utils/utitilites";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where } from "firebase/firestore";

function Chat({ id, users }) {
	const [user] = useAuthState(auth);
	const recipientEmail = getRecipientEmail(users, user);

	const q = query(
		collection(db, "users"),
		where("email", "==", recipientEmail)
	);

	const recipient = q?.docs?.[0]?.data();

	return (
		<div>
			<div className="flex items-center m-1 space-x-3 cursor-pointer p-4 break-words hover:bg-gray-300">
				{recipient ? (
					<img
						className="rounded-full h-10 w-10"
						src={recipient?.photoURL}
						alt=""
					/>
				) : (
					<img
						className="rounded-full h-10 w-10"
						src={recipientEmail[0]}
						alt=""
					/>
				)}
				<p>{recipientEmail}</p>
			</div>
		</div>
	);
}

export default Chat;
