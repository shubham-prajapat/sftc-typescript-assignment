import User from "../models/User.js";
import { qs } from "../utils/dom.js";
import AddBtn from "./AddBtn.js";
import FormFields from "./FormFields.js";
import SearchInput from "./SearchInput.js";
import Table from "./Table.js";
import TemplateRenderer from "./TemplateRenderer.js";

class UserView extends TemplateRenderer {
	users: User[];
	constructor(users: User[], public options: { container: HTMLElement; fieldsToShow: FieldSchema[] }) {
		// set initial template
		super(qs("template#user-view") as HTMLTemplateElement, options.container);
		this.users = users;
		this.configure();
	}
	configure = () => {
		// Set New User Button
		new AddBtn({
			container: qs("#add-user-container", this.options.container) as HTMLTemplateElement,
		});

		// Set New User Form
		new FormFields(this.options.fieldsToShow, {
			container: qs("#new-user-form") as HTMLElement,
		});

		// Set New User Button
		new SearchInput({
			container: qs("#search-input-container", this.options.container) as HTMLTemplateElement,
			handleSearch: this.handleSearch,
		});

		// Set User List Table
		this.refreshTable();
	};
	refreshTable = () => {
		new Table({
			container: qs("#table-wrapper", this.options.container) as HTMLTemplateElement,
			content: {
				fields: this.options.fieldsToShow,
				entities: this.users,
			},
		});
	};
	handleSearch = (query: string) => {
		console.log(query);
		this.users.forEach((user) => {
			user.hide = !user.contains(query);
		});
		this.refreshTable();
	};
}

export default UserView;
