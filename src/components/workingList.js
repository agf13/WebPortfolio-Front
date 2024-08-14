// src/components/workingList.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkingDto } from '../models/workingModel.js';
import WorkingTile from './workingTile.js';
import '../styles/working.css';


export default function WorkingList() {
	const [data, setData] = useState(null);
	const [workingList, setWorkingList] = useState(null);
	const [partialWorkingList, setPartialWorkingList] = useState([]);
	const navigate = useNavigate();

	function fetchAll() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `http://localhost:3000/workings`);

		xhr.onload = function() {
			if (xhr.status === 200) {
				setData(JSON.parse(xhr.responseText)); // set data variable         
				if (data !== [] && data !== "" && data !== null) {
					console.log(data);
					setWorkingList(data);
					return;
					var newWorking = new WorkingDto(
						data['id'],
						data['title'],
						data['description'],
						data['link'],
						data['status'],
						data['image'],
					);
					//setWorking(newWorking);
					//setApiImage(`http://localhost:3000/workings/${id}/image?randomNumber=${new Date().getTime()}`);
				}
			}       
			else {
				setData("Processing ...");
			}       
		}

		xhr.send();
	}

	function createNew() {
		navigate("/working/new");
	}

	const onDelete = (id) => {
		console.log("Action triggered");
		const newWorkingList = partialWorkingList.filter(item => item.id != id);
		setPartialWorkingList(newWorkingList);
	}

	function showList() {
		// check if the workingList exists
		if(workingList === null) return (<div> </div>);
		console.log(workingList);

		// filter elements that are not marked as visible
		const partialWorkingList = workingList.filter(item => item.status.toLowerCase() === 'visible');
		console.log("partialworkinglist:",partialWorkingList);

		// return the list of elements
		return (
			<ul className="workingsList" >
				{partialWorkingList.map((item, index) => (
					<>
						<li key={index}>
							<WorkingTile workingToLoad={item} className="workingTile" onDelete={onDelete} />
						</li>
						<br />
					</>
				))}
			</ul>
		);
	}

	return (
		<div>
			<center>
				<button onClick={fetchAll} className="reloadListButton"> Load workings </button>
				<button onClick={createNew} className="newWorkingListButton"> New working </button>
				{showList()}
			</center>
		</div>
	);
}
