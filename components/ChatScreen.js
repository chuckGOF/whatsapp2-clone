import React from "react";
import {useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase";

function ChatScreen({ x }) {
    const [user] = useAuthState(auth)
	return (
        <div className="mt-8 p-5">
            <div className="p-3 bg-green-300 border-2">{user.displayName}</div>
            <h1>this is the ChatScreen</h1>
            <p>{x}</p>
		</div>
	);
}

export default ChatScreen;
