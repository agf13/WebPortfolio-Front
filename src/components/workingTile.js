import React, { useState } from 'react';
import { WorkingDto } from '../models/workingModel.js';

export default function WorkingTile() {
	const [data, setData] = useState(null);
	const [working, setWorking] = useState(null);
	const [apiImage, setApiImage] = useState("");

	function fetchAndPopulateWorking() {
		resetWorking();
		getWorking();
	}

	function getWorking() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:3000/workings/1');

		xhr.onload = function() {
			if (xhr.status === 200) {
				setData(JSON.parse(xhr.responseText)); // set data variable			
				if (data != [] && data != "" && data != null) {
					console.log(data);
					var newWorking = new WorkingDto(
						data['id'], 
						data['title'], 
						data['description'], 
						data['link'], 
						data['status'],
						data['image'],
					);
					setWorking(newWorking);
					setApiImage("http://localhost:3000/workings/1/image");
				}
			}
			else {
				setData("Processing ...");
			}
		}

		xhr.send();
	}

	function resetWorking() {
		console.log("Trying out new things");
		setApiImage("");
	}

	function workingElement() {
		return (
			<div>
				<p>{working.title}</p>
				<p>{working.description}</p>
				<p>{working.link}</p>
				<p>{working.status}</p>
				<img src={apiImage}  width="100" height="100" />
			</div>
		);
	}

	return (
		<div>
			<button onClick={fetchAndPopulateWorking}>
				{"I'm a button, click me"}
			</button>
			{working ? workingElement() : (<p> ... </p>) }
		</div>
	);
}
