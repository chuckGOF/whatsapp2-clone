/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Circle } from "@binaryluke/better-react-spinkit";

function Loading() {

	return (
		<div className="grid place-items-center h-screen">
			<div className='flex flex-col items-center justify-center'>
				<img
					className="h-52 w-52 mb-4"
					src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
					alt=""
				/>
				<Circle size={60} color="#3cbc28" />
			</div>
		</div>
	);
}

export default Loading