import { Roles } from "../models/User.js";

class FormFields {
	constructor(public fields: FieldSchema[], public options: { container: HTMLElement }) {
		this.configure();
	}
	configure() {
		console.log(this.fields);

		let userInput: HTMLInputElement | HTMLSelectElement;
		for (let field of this.fields) {
			if (typeof field.value === "string") {
				userInput = document.createElement("input");
				userInput.type = field.value;
				userInput.placeholder = field.label;
			} else {
				userInput = document.createElement("select");
				userInput.className = "browser-default";
				userInput.style.width = "max-content";
				for (let option of field.value) {
					userInput.innerHTML += `<option value="${option[0]}" ${
						Roles.Subscriber.toString() === option[0].toString() ? "selected" : ""
					}>${option[1]}</option>`;
				}
			}
			this.options.container.appendChild(userInput);
		}
	}
}

export default FormFields;
