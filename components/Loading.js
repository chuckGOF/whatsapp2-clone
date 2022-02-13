/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {Circle} from 'bett'

function Loading() {
  return (
		<div>
			<img 
            className='h-52 w-52 mb-12'
				src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
				alt=""
			/>
            <Circle />
		</div>
  );
}

export default Loading