import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import {
	DotsVerticalIcon,
	PaperClipIcon,
	EmojiHappyIcon,
	MicrophoneIcon,
} from "@heroicons/react/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [input, setInput] = useState("");
	// const [messagesSnapshot] = useCollection(
	// 	query(
	// 		// collection(db, 'chats', router.query.id, 'messages')
	// 		collection(
	// 			doc(collection(db, "chats"), router.query.id),
	// 			"messages"
	// 		),
	// 		orderBy("timestamp", "asc")
	// 	)
	// );

	const showMessages = () => {
		if (true) return "";
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => {
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>;
			});
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			{/* Header */}
			<div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-b-gray">
				<Avatar src="" />

				{/* HeaderInformation */}
				<div className="ml-4 flex-1">
					<h3 className="mb-1">{user.displayName}</h3>
					<p className="text-sm text-gray-400">Last Seen ...</p>
				</div>

				{/* HeaderIcons */}
				<div className="flex space-x-4">
					{/* IconButton */}
					<div>
						<PaperClipIcon className="h-10 w-10 text-gray-500" />
					</div>
					{/* IconButton */}
					<div>
						<DotsVerticalIcon className="h-10 w-10 text-gray-500" />
					</div>
				</div>
			</div>

			{/* message container */}
			<div className="p-8 h-screen">
				{/* show message */}
				{showMessages()}
				{/* end of message */}
				<div></div>
			</div>

			{/* input container */}
			<form className="flex items-center p-3 sticky bg-white z-50 bottom-0">
				<EmojiHappyIcon className="h-10 w-10 text-gray-500" />
				<input
					className="flex-1 outline-0 border-none bg-gray-100 p-5 rounded-xl ml-4 mr-4"
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<MicrophoneIcon className="h-10 w-10 text-gray-500" />
				<button
					hidden
					disabled={!input}
					type="submit"
					onClick={sendMessage}
				>
					Send Message
				</button>
			</form>
		</div>
	);
}

export default ChatScreen;
