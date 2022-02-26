import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";
import {getRecipientEmail} from  '../../utils/utitilites'

function Chat({data}) {
    const [user] = useAuthState(auth)
	return (
		<div className="flex">
			<Head>
				<title>Chat with {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar />
			<div className="flex-1 overflow-scroll h-screen">
				<ChatScreen x={data} />
			</div>
		</div>
	);
}

export default Chat;


// server side
export async function getServerSideProps(context) {
    const ref = doc(collection(db, 'chats'), context.query.id) //doc(db, 'chats', context.query.id)//
    const docSnap = await getDoc(ref)
    console.log(docSnap.data())

    if (docSnap.exists()) {
        console.log('Document data: ', docSnap.data())
    } else {
        console.log('no such document')
    }

    return {
        props: {
            data: JSON.stringify(docSnap.data())
        }
    }

    // const q = query(ref, orderBy('timestamp', 'asc'))

    // Prep the messages on the server
    // const messageSnap = await getDoc(q, 'messages')
    // const messages = messageSnap.docs.map(doc => ({
    //     id: doc.id,
    //     ...doc.data()
    // })).map(messages => ({
    //     ...messages,
    //     timestamp: messages.timestamp.toDate().getTime()
    // }))

    // // Prep the chats
    // const chatSnap = await getDoc(q)
    // const chat = {
    //     id: chatSnap.id,
    //     ...chatSnap.data()
    // }

    // console.log(chat, messages)

    // return {
    //     props: {
    //         messages: JSON.stringify(messages),
    //         chat: chat
    //     }
    // }

}
