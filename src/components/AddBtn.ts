import { qs } from "../utils/dom.js";
import TemplateRenderer from "./TemplateRenderer.js";

class AddBtn extends TemplateRenderer {
	constructor(public options: { container: HTMLElement }) {
		super(qs("template#add-btn") as HTMLTemplateElement, options.container);
		this.configure();
	}
	onClick = () => {
		console.log("Add user clicked!");
	};
	configure = () => {
		let button = qs("button", this.options.container) as HTMLButtonElement;
		button.addEventListener("click", this.onClick);
	};
}
export default AddBtn;
