/* eslint-disable @next/next/no-img-element */
import React from "react";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../utils/utitilites";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useCollection} from 'react-firebase-hooks/firestore'

function Chat({ id, users }) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const recipientEmail = getRecipientEmail(users, user);

	const [recipientSnapshot] = useCollection(
		query(collection(db, "users"), where("email", "==", recipientEmail))
	);

	const recipient = recipientSnapshot?.docs?.[0]?.data();

	const enterChat = () => {
		router.push(`/chat/${id}`);
	};

	return (
		<div>
			<div
				onClick={enterChat}
				className="flex items-center m-1 space-x-3 cursor-pointer p-4 break-words hover:bg-gray-300"
			>
				{recipient ? (
					<Avatar src={recipient?.photoUrl} />
				) : (
					<Avatar>{recipientEmail[0]}</Avatar>
				)}
				<p>{recipientEmail}</p>
			</div>
		</div>
	);
}

export default Chat;
