import React from "react";

function Message({user, message}) {
	return (
		<div>
			<h1>This is the message component</h1>
			<p>{message}</p>
		</div>
	);
}

export default Message;
