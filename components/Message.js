import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
	const [userLoggedIn] = useAuthState(auth);

	return (
		<div>
			<p
				className={`w-fit p-4 rounded-lg m-2 min-w-[60px] pb-6 relative text-right ${
					user === userLoggedIn.email && "ml-auto bg-lime-200"
				} ${user !== userLoggedIn.email && "bg-gray-300 text-left"}`}
			>
				{message.message}
				<span className="text-gray-500 p-2 text-xs absolute bottom-0 text-right right-0">
					{message.timestamp
						? moment(message.timestamp).format("LT")
						: "..."}
				</span>
			</p>
		</div>
	);
}

export default Message;
