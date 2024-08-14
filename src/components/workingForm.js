// src/compontents/workingForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { WorkingDto } from '../models/workingModel.js';
import '../styles/working.css';

export default function WorkingForm() {
	const [working, setWorking] = useState(null);
	const [data, setData] = useState(null);
	const [apiImage, setApiImage] = useState("");
	const [loading, setLoading] = useState(true);
	var { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { workingToUse, someField} = location.state || {};

	var imageFile = null;

	useEffect(() => {
		async function fetchData() {
			try {
				initForm();
			} catch (error) {
				console.log('Error: ', error);
			} finally {
				setLoading(false);
			}
		}
		if(location.state && location.state.working) {
			id = location.state.working.id;
			setWorking(location.state.working);
		}
		
		if(id !== undefined) {
			fetchData();
			console.log("Id id defined?", id);
		} 
		else {
			setLoading(false);
		}
	}, []);

	async function initForm() {
		console.log("Is initForm called? Is id set:", id);
		if(id !== undefined) {
			retrieveWorking();
		}
	}

	function retrieveWorking() {
		return new Promise((resolve, object) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', `http://localhost:3000/workings/${id}`);

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
						if(newWorking !== undefined) {
							populateFields(newWorking);
							console.log("successfully finished");
						}
					}
				}
				else {
					console.log(`no such working with the given id: ${id}`);
				}
			}

			xhr.send();
		});
	}

	function populateFields(newWorking) {
		console.log("when does it get here?");
		const titleElement = document.getElementById('title');
		const linkElement = document.getElementById('link');
		const descriptionElement = document.getElementById('description');
		const statusElement = document.getElementById('status');

		titleElement.value = newWorking.title
		linkElement.value = newWorking.link
		descriptionElement.value = newWorking.description
		statusElement.checked = newWorking.status === 'VISIBLE' || newWorking.status === 'visible'
		console.log("Is element visible:", (newWorking.status === 'VISIBLE' || newWorking.status === 'visible'));
	}

	function handleSubmit() {
		console.log("Form clicked");
		
		const titleElement = document.getElementById('title');
		const linkElement = document.getElementById('link');
		const descriptionElement = document.getElementById('description');
		const statusElement = document.getElementById('status');

		const title = titleElement.value;
		const link = linkElement.value;
		const description = descriptionElement.value;
		const status = statusElement.checked ? 'VISIBLE' : 'HIDDEN';
		console.log("Status was set to:", status);

		console.log("Title", title);
		console.log("Link", link);
		console.log("Descr", description);
		console.log("Stat", status);

		if(id !== undefined && id !== null) {
			updateWorking(title, link, description, status);
		}
		else {
			addWorking(title, link, description, status);
		}

		navigate('/workings');
	}

	function addWorking(title, link, description, status) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', `http://localhost:3000/workings`);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const data = JSON.stringify({
			title: title,
			link: link,
			description: description,
			status: status
		});

		xhr.onload = function () {
			if (xhr.status === 201) {
				// get the id of the newly created object to upload the picture (if existent) as well
				var response = JSON.parse(xhr.responseText);
				id = response.id;
				
				if(imageFile !== null) {
					onFileUpload(id);
				}
			}
			else {
				console.log("I'm finding this hard to believe?", xhr.status);
			}
		}

		xhr.send(data);
	}

	function updateWorking(title, link, description, status) {
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', `http://localhost:3000/workings/${id}`);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const data = JSON.stringify({
			title: title,
			link: link,
			description: description,
			status: status
		});

		xhr.send(data);
	}

	function onFileAdd(event) {
		console.log(event.target.files[0]);
		imageFile = event.target.files[0];
	}

	const onFileUpload = async (givenId) => {
		const formData = new FormData();
		const idToUse = givenId ? givenId : id;
		formData.append('image', imageFile);

		try {
			const response = await fetch(`http://localhost:3000/workings/${id}/image`, {
				method: 'POST',
				body: formData,
			});

			if(!response.ok) {
				throw new Error("Error when uploading image");
			}

			const result = await response.json();
			console.log("image uploaded successfully");
		} catch (error) {
			console.error('Error:', error);
		}
	}

	if(loading) {
		return (
			<div>Loading ... </div>
		);
	}

	return (
		<div className="workingForm">
			<p className="workingFormLabel">Title: </p>
			<input type="text" id="title" className="workingFormField" defaultValue={working ? working.title : ""}/>
			<br/>

			<p className="workingFormLabel">Link: </p>
			<input type="text" id="link" className="workingFormField" defaultValue={working? working.link : ""} />
			<br/>

			<p className="workingFormLabel">Description: </p>
			<textarea id="description" className="workingFormTextarea" defaultValue={working? working.description : ""} />
			<br />

			<div className="workingFormInline">
				<p className="workingFormLabel">Visible: </p>
				<input type="checkbox" id="status" className="workingFormCheckbox" />
			</div>

			<div className="workingFormLabel workingFormInline">
				<p className="workingFormLabel">Image:</p>
				<input type="file" id="image" accept="image/*" onChange={onFileAdd} className="workingFormUploadImage"/>
			</div>
			<br />
			<br />

			<button onClick={handleSubmit} style={{ padding: "20px" }}>
				Submit
			</button>

			<br />
			<br />
			<br />
			<br />
			<p> In case that the form should have had data in the fields and it does not, please click the button below to reload the form </p>
			<button onClick={initForm}> Reload data </button>
		</div>
	);
}
