import React from "react";
import {useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase";
import {useRouter} from 'next/router'

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth)
    const router = useRouter()
	return (
        <div className="mt-8 p-5">
            <div className="p-3 bg-green-300 border-2">{user.displayName}</div>
            <p>{x}</p>
		</div>
	);
}

export default ChatScreen;
