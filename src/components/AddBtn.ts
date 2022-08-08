import { qs } from "../utils/dom.js";
import TemplateRenderer from "./TemplateRenderer.js";

class AddBtn extends TemplateRenderer {
	constructor(public options: { container: HTMLElement }) {
		super(qs("template#add-btn") as HTMLTemplateElement, options.container);
		this.configure();
	}
	configure = () => {};
}
export default AddBtn;
