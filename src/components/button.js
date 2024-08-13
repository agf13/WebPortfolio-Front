// src/components/button.js

import React, { useState } from 'react';

export default function MyButton() {
 	const [data, setData] = useState(null);
	console.log("loggin for module. Hope it works");

	function handleClick() {
		console.log("at least logs");
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:3000/workings/');

		xhr.onload = function() {
			if (xhr.status === 200) {
				setData(JSON.parse(xhr.responseText));
			}
			else {
				setData("Still in process");
			}
		};

		xhr.send();
	}

	function justLog() {
		console.log("This is asdfghjkl just log function")
	}

	return (
		<div>
			<button onClick={handleClick}>
				{"I'm a button"}
			</button>
			{data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}
			{"And some other text"}
		</div>
	);
}
