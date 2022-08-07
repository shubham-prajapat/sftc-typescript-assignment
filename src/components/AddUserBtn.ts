import { qs } from "../utils/dom.js";
import TemplateRenderer from "./TemplateRenderer.js";

class AddUserBtn extends TemplateRenderer {
	constructor(public options: { container: HTMLElement }) {
		super(qs("template#add-user") as HTMLTemplateElement, options.container);
		this.configure();
	}
	onClick = () => {
		console.log("default");
	};
	configure = () => {
		let button = qs("button", this.options.container) as HTMLButtonElement;
		button.addEventListener("click", this.onClick);
	};
}
export default AddUserBtn;
