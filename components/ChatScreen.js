import React from "react";
import {useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from "../firebase";
import { doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material/Avatar";
import {
	DotsVerticalIcon,
	PaperClipIcon,
	EmojiHappyIcon,
} from "@heroicons/react/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [messagesSnapshot] = useCollection(
		query(
			doc(db, "chats", router.query.id, "messages"),
			orderBy("timestamp", "asc")
		)
	);
	const showMessages = () => {
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
	return (
		<div className="mt-8 p-5">
			{/* Header */}
			<div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-b-white">
				<Avatar />
				{/* HeaderInformation */}
				<div className="ml-4 flex-1">
					<h3 className="mb-1">{user.displayName}</h3>
					<p className="text-sm text-gray-400">Last Seen ...</p>
				</div>
				{/* HeaderIcons */}
				<div>
					{/* IconButton */}
					<div>
						<PaperClipIcon />
					</div>
					{/* IconButton */}
					<div>
						<DotsVerticalIcon />
					</div>
				</div>
			</div>

			{/* message container */}
			<div>
				{/* show message */}
				{showMessages()}
				{/* end of message */}
				<div></div>
			</div>

			{/* input container */}
			<div>
				<EmojiHappyIcon />
				<div>
					<input type="text" />
				</div>
			</div>
		</div>
	);
}

export default ChatScreen;
