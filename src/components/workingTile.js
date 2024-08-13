import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WorkingDto } from '../models/workingModel.js';
import '../styles/working.css';

export default function WorkingTile() {
	const [data, setData] = useState(null);
	const [working, setWorking] = useState(null);
	const [apiImage, setApiImage] = useState("");
	const { id } = useParams();

	function fetchAndPopulateWorking() {
		resetWorking();
		getWorking();
	}

	function getWorking() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `http://localhost:3000/workings/${id}`);
		xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
		xhr.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
		xhr.setRequestHeader("Pragma", "no-cache");

		xhr.onload = function() {
			if (xhr.status === 200) {
				setData(JSON.parse(xhr.responseText)); // set data variable			
				if (data !== [] && data !== "" && data !== null) {
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
					setApiImage(`http://localhost:3000/workings/${id}/image?randomNumber=${new Date().getTime()}`);
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
			<div className="workingTile">
				<p className="workingText">{working.title}</p>
				<p className="workingText">{working.status}</p>
				<a href={working.link}>
					<img src={apiImage}  className="workingImage"/>
				</a>
				<p className="workingText">{working.description}</p>
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
