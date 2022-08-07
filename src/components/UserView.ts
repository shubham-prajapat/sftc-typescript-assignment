import User from "../models/User.js";
import { qs } from "../utils/dom.js";
import AddUserBtn from "./AddUserBtn.js";
import TemplateRenderer from "./TemplateRenderer.js";

class UserView extends TemplateRenderer {
	constructor(public users: User[], public options: { container: HTMLElement }) {
		// set initial template
		super(qs("template#user-view") as HTMLTemplateElement, options.container);
		this.configure();
	}
	configure = () => {
		// Set New User Button
		new AddUserBtn({
			container: qs("#addUserContainer", this.options.container) as HTMLTemplateElement,
		});
	};
}

export default UserView;
