import User from "../models/User.js";
import { qs } from "../utils/dom.js";
import TemplateRenderer from "./TemplateRenderer.js";

class Table extends TemplateRenderer {
	constructor(public options: { container: HTMLElement; content: { fields: FieldSchema[]; entities: User[] } }) {
		super(qs("template#table") as HTMLTemplateElement, options.container);
		this.configure();
	}
	configure = () => {
		this.hydrateHead();
		this.hydrateData();
	};

	hydrateHead = () => {
		let tHead = qs("thead", this.options.container)!;
		tHead.innerHTML = "";
		let headRow = document.createElement("tr");
		for (let field of this.options.content.fields) {
			let headCol = document.createElement("th");
			headCol.textContent = field.label;
			headRow.appendChild(headCol);
		}
		let headCol = document.createElement("th");
		headCol.textContent = "Actions";
		headRow.appendChild(headCol);

		tHead.appendChild(headRow);
	};
	hydrateData = () => {
		let tBody = qs("tbody", this.options.container) as HTMLElement;
		tBody.innerHTML = "";

		for (let entity of this.options.content.entities) {
			if (entity.deleted) {
				continue;
			}
			let row = entity.getEntryRow();
			entity.addUpdateListener(() => {
				this.hydrateData();
			});
			if (entity.hide) {
				row.style.display = "none";
			}
			tBody.appendChild(row);
		}
	};
}
export default Table;
