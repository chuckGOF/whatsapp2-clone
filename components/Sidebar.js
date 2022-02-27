/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
	DotsVerticalIcon,
	ChatAltIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { user } from "../constants";
import { collection, addDoc, query, where, getDocs, connectFirestoreEmulator } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
	const [user] = useAuthState(auth);
	const userChatRef = query(
		collection(db, "chats"),
		where("users", "array-contains", user.email)
	);
	const [chatsSnapshot] = useCollection(userChatRef);

	const chatExists = (recipientEmail) => {
		return !!chatsSnapshot?.docs.find(
			(chat) =>
				chat.data().users.find((user) => user === recipientEmail)
					?.length > 0
		);
	};

	const createChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);

		if (!input) return null;

		// check if valid email address
		if (
			EmailValidator.validate(input) &&
			!chatExists(input) &&
			input !== user.email
		) {
			// add chat into DB 'chats' collection if it doesnt already exitst and is valid
			const addChat = async () => {
				const docRef = await addDoc(collection(db, "chats"), {
					users: [user.email, input],
				});
			};
			addChat();
		}
	};

	const handleAuthentication = () => {
		signOut(auth)
			.then(() => {
				console.log("succefully signed out");
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		// container
		<div className="flex-[0.45] border-r border-r-gray-100 h-screen min-w-[300px] max-w-[350] overflow-y-scroll scrollbar-none">
			{/* header  */}
			<div className="flex sticky top-0 bg-white z-[1] justify-between items-center p-4 h-20 border-b-gray border-b">
				<img
					// onClick={() => signOut(auth)}
					onClick={handleAuthentication}
					className="rounded-full h-14 w-14 cursor-pointer hover:opacity-80"
					src="https://media-exp1.licdn.com/dms/image/C4E03AQFEBdlH7oLaVA/profile-displayphoto-shrink_400_400/0/1626149579570?e=1649894400&v=beta&t=FCwRF7mI3DbyRikhnhA49-20pkIPn7fiWpfoC8oktDc"
					alt=""
				/>
				{/* IconsContainer */}
				<div className="flex space-x-4">
					<ChatAltIcon className="h-14 w-14 cursor-pointer text-gray-500" />
					<DotsVerticalIcon className="h-14 w-14 cursor-pointer text-gray-500" />
				</div>
			</div>

			{/* Search */}
			<div className="flex items-center p-5 rounded-sm space-x-1 justify-center">
				<SearchIcon className="h-6 w-6 text-gray-500" />
				<input
					className="outline-none flex-1"
					type="text"
					placeholder="Search in chats"
				/>
			</div>

			{/* button */}
			<button
				onClick={createChat}
				className="w-full p-5 font-semibold text-gray-600 border-t-2 border-t-gray-50 border-b-2 border-b-gray-50 hover:bg-gray-50"
			>
				START A NEW CHAT
			</button>

			{chatsSnapshot &&
				chatsSnapshot?.docs.map((chat) => (
					<Chat
						key={chat.id}
						id={chat.id}
						users={chat.data().users}
					/>
				))}
		</div>
	);
}

export default Sidebar;
