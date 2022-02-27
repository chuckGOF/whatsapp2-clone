import React from "react";
import {useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase";
import {useRouter} from 'next/router'
import { Avatar } from "@mui/material/Avatar";
import { DotsVerticalIcon, PaperClipIcon } from "@heroicons/react/outline";

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	return (
		<div className="mt-8 p-5">
			{/* Header */}
			<div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-b-white">
				<Avatar />
				{/* HeaderInformation */}
				<div className="ml-4 flex-1">
					<h3 className="mb-1">{user.displayName}</h3>
					<p className='text-sm text-gray-400'>Last Seen ...</p>
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

                {/* end of message */}
                <div></div>
            </div>
		</div>
	);
}

export default ChatScreen;
