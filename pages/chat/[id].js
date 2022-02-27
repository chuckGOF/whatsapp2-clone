import { collection, doc, getDoc, orderBy, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db, auth } from "../../firebase";
import { getRecipientEmail } from "../../utils/utitilites";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({ chat, messages }) {
	const [user] = useAuthState(auth);
	return (
		<div className="flex">
			<Head>
				<title>Chat with {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar />
			<div className="flex-1 overflow-scroll h-screen">
				<ChatScreen chat={chat} message={messages} />
			</div>
		</div>
	);
}

export default Chat;

// server side
export async function getServerSideProps(context) {
	const ref = doc(collection(db, "chats"), context.query.id); //doc(db, 'chats', context.query.id)

	// Prep the messages on the server
	const messageSnap = await getDocs(
		query(collection(ref, "message")),
		orderBy("timestamp", "asc")
    );
    
	const messages = messageSnap.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
        }))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
        }));

	// Prep the chats
	const chatSnap = await getDoc(ref);
	const chat = {
		id: chatSnap.id,
		...chatSnap.data(),
	};

	console.log(chat, messages);

	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat,
		},
	};
}
