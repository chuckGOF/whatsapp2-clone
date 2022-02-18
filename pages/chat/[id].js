import Head from "next/head";
import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat() {
	return (
		<div className="flex">
			<Head>
				<title></title>
			</Head>
			<Sidebar />
			<div className="flex-1">
				<ChatScreen />
			</div>
		</div>
	);
}

export default Chat;
