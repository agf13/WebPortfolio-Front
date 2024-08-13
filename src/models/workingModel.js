// src/models/WorkingModel.js

export class WorkingDto {
	id: number;
	title: string;
	description: string;
	link: string;
	status: string;
	image: string;

	constructor(id: number, title: string, description: string, link: string, status: string, image: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.link = link;
		this.status = status;
		this.image = image;
	}
}
