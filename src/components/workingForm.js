import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WorkingDto } from '../models/workingModel.js';
import '../styles/working.css';

export default function WorkingForm() {
	const [working, setWorking] = useState(null);

	function handleSubmit() {
		console.log("Form clicked");
		
		const titleElement = document.getElementById('title');
		const linkElement = document.getElementById('link');
		const descriptionElement = document.getElementById('description');
		const visibleElement = document.getElementById('visible');

		const title = titleElement.value;
		const link = linkElement.value;
		const description = descriptionElement.value;
		const visible = visibleElement.checked ? 'VISIBLE' : 'HIDDEN';

		console.log("Title", title);
		console.log("Link", link);
		console.log("Descr", description);
		console.log("Vis", visible);

		addWorking(title, link, description, visible);
	}

	function addWorking(title, link, description, visible) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', `http://localhost:3000/workings`);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const data = JSON.stringify({
			title: title,
			link: link,
			description: description,
			visible: visible
		});

		xhr.send(data);
	}

	return (
		<div className="workingForm">
			<p className="workingFormLabel">Title: </p>
			<input type="text" id="title" className="workingFormField"/>
			<br/>

			<p className="workingFormLabel">Link: </p>
			<input type="text" id="link" className="workingFormField"/>
			<br/>

			<p className="workingFormLabel">Description: </p>
			<textarea id="description" className="workingFormField"/>
			<br />

			<div className="workingFormInline">
				<p className="workingFormLabel">Visible: </p>
				<input type="checkbox" id="visible" className="workingFormCheckbox" />
			</div>
			<br />

			<button onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
}
