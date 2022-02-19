import { collection, doc, getDoc, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

function Chat() {
	return (
		<div className="flex">
			<Head>
				<title></title>
			</Head>
			<Sidebar />
			<div className="flex-1 overflow-scroll h-screen">
				<ChatScreen />
			</div>
		</div>
	);
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = doc(collection(db, 'chats'), context.query.id)
    const q = query(ref, orderBy('timestamp', 'asc'))

    // Prep the messages on the server
    const messageSnap = await getDoc(q, 'messages')
    const messages = messageSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    // Prep the chats
    const chatSnap = await getDoc(q)
    const chat = {
        id: chatSnap.id,
        ...chatSnap.data()
    }

}
