/* eslint-disable @next/next/no-img-element */
import React from "react";
import { DotsVerticalIcon, ChatAltIcon } from "@heroicons/react/outline";

function Sidebar() {
	return (
		// container
		<div>
			{/* header  */}
			<div className="flex sticky top-0 bg-white z-[1] justify-between items-center p-4 h-20 border-b-gray border-b-2">
				<img
					className="rounded-full h-14 w-14 cursor-pointer"
					src="https://media-exp1.licdn.com/dms/image/C4E03AQFEBdlH7oLaVA/profile-displayphoto-shrink_400_400/0/1626149579570?e=1649894400&v=beta&t=FCwRF7mI3DbyRikhnhA49-20pkIPn7fiWpfoC8oktDc"
					alt=""
				/>
				{/* IconsContainer */}
				<div className="flex">
					<ChatAltIcon className="h-14 w-14 cursor-pointer text-gray-500" />
					<DotsVerticalIcon className="h-14 w-14 cursor-pointer text-gray-500" />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
