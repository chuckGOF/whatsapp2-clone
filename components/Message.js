import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Message({ user, message }) {
	const [userLoggedIn] = useAuthState(auth);
	const MessageStyle = user === userLoggedIn.email ? "yes" : "no";

	return (
		<div>
			<p className={'w-fit p-4 rounded-lg m-3 min-w-[60px] pb-6 relative text-right'}>
				{message.message}
			</p>
		</div>
	);
}

export default Message;
