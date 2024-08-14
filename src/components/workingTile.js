// src/components/workingTile.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkingDto } from '../models/workingModel.js';
import penGif from '../assets/gifs/pen.gif';
import arrowGif from '../assets/gifs/arrow2.gif';
import trashGif from '../assets/gifs/trash-can.gif';
import '../styles/working.css';

export default function WorkingTile({ workingToLoad }) {
	const [data, setData] = useState(null);
	var [working, setWorking] = useState(null);
	var [apiImage, setApiImage] = useState("");
	const [showMenu, setShowMenu] = useState("hidden");
	const { id } = useParams();
	const navigate = useNavigate();

	function fetchAndPopulateWorking() {
		if(workingToLoad) {
			// we don't need to fetch the object in this case
			return; 
		}
		console.log("After the workingToLoad check");
		resetWorking();
		getWorking();
	}

	function getWorking() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `http://localhost:3000/workings/${id}`);

		xhr.onload = function() {
			if (xhr.status === 200) {
				setData(JSON.parse(xhr.responseText)); // set data variable			
				if (data !== [] && data !== "" && data !== null) {
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

	function goToEditPage() {
		navigate(`/working/edit/${workingToLoad ? workingToLoad.id : id}`, { state: { working: working, somefield: 'abc' } });
	}

	function goToLink() {
		const partialLink = workingToLoad ? workingToLoad.link : (working ? working.link : "");
		const linkToRedirect = `https://${partialLink}`;
		console.log(linkToRedirect);
		window.location.href = linkToRedirect;
	}

	function deleteWorking() {
		const id = workingToLoad ? workingToLoad.id : (working ? working.id : null);

		const xhr = new XMLHttpRequest();
		xhr.open('DELETE', `http://localhost:3000/workings/${id}`);

		xhr.onload = function() {
			console.log("Deleting working with id:", id);
			if (xhr.status === 200) {
				navigate("/workings");
			}
			else {
				console.log("Some error occured and working could not have been deleted");
			}
		}

		xhr.send();

	}

	function resetWorking() {
		console.log("Trying out new things");
		setApiImage("");
	}

	function toggleMenu() {
		const newMenuState = showMenu === "hidden" ? "visible" : "hidden";
		setShowMenu(newMenuState);
	}

	const hoveringMenu = () => {
		return (
			<div className="workingHoverMenu">
				<button> 123 </button>
				<br />
				<button> 345 </button>
			</div>
		);
	}

	function workingElement(workingParam) {
		return (
			<div className="workingTile" onClick={toggleMenu}>
				<div className="workingHoverButton1">
					<button style={{ padding: "10px", visibility: showMenu }} onClick={goToEditPage} className="zoomedGif">
						<img src={penGif} width="20px" height="20px" className="zoomedGifOnImage" />
					</button>
				</div>
				<div className="workingHoverButton2">
					<button style={{ padding: "10px", visibility: showMenu }} onClick={goToLink} className="zoomedGif">
						<img src={arrowGif} className="zoomedGifOnImage" />
					</button>
				</div>
				<div className="workingHoverButton3">
					<button style={{ padding: "10px", visibility: showMenu }} onClick={deleteWorking} className="zoomedGif">
						<img src={trashGif} width="20px" height="20px" className="zoomedGifOnImage" />
					</button>
				</div>

				<p className="workingText workingTitle">{workingParam ? workingParam.title : working.title}</p>
				<img src={apiImage}  className="workingImage"/>
				<p className="workingText">{workingParam ? workingParam.description : working.description}</p>

			</div>
		);
	}

	if(workingToLoad) {
		apiImage = `http://localhost:3000/workings/${workingToLoad.id}/image?randomNumber=${new Date().getTime()}`;
		return workingElement(workingToLoad);
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
