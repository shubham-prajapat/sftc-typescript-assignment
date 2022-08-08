import { Roles, UserEntry } from "../models/User.js";
import Validator from "../utils/validation.js";

class FormFields {
	constructor(
		public fields: FieldSchema[],
		public options: { container: HTMLElement; onSubmit: (userInputs: {}) => void }
	) {
		this.configure();
	}
	configure() {
		let form = document.createElement("form");

		let userInputMarkup = ``;
		for (let field of this.fields) {
			if (typeof field.value === "string") {
				userInputMarkup = `<div class="input-field">
                    <input name="${field.key}" id="${field.key}" type="${field.value}">
                    <label for="${field.key}">${field.label}</label>
                </div>`;
			} else {
				userInputMarkup = `<div style="margin-bottom: 1rem;">
                    <label>${field.label}</label>
                    <select class="browser-default" style="width: max-content;" name="${field.key}">
                        ${field.value.map((option) => {
							return `<option value="${option[0]}" ${
								Roles.Subscriber.toString() === option[0].toString() ? "selected" : ""
							}>${option[1]}</option>`;
						})}
                    </select>
                </div>`;
			}
			form.innerHTML += userInputMarkup;
			this.options.container.innerHTML = "";
			this.options.container.appendChild(form);
		}

		const submitButton = document.createElement("button");
		submitButton.type = "submit";
		submitButton.className = "btn";
		submitButton.innerText = "Save";

		form.appendChild(submitButton);
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			let fd = new FormData(e.currentTarget as HTMLFormElement);
			let allGood = true;
			let finalInputs: Record<string, string | number | boolean> = {};

			for (let field of this.fields) {
				let userInput: any;
				userInput = fd.get(field.key);

				if (field.value === "number" && typeof userInput === "string") {
					userInput = parseInt(userInput);
				}

				let valid = Validator.run(userInput, field.validations);
				if (!valid) {
					allGood = false;
					window.M.toast({ html: `Invalid ${field.label}` });
					break;
				}
				finalInputs[field.key] = userInput;
			}
			if (allGood) {
				this.options.onSubmit(finalInputs);
			}
		});
	}
}

export default FormFields;
