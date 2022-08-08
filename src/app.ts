import UserView from "./components/UserView.js";
import User, { Roles, UserEntry } from "./models/User.js";
import { qs } from "./utils/dom.js";

// config
const fieldsToShow: Array<FieldSchema> = [
	{
		key: "firstName",
		label: "First Name",
		value: "text",
	},
	{
		key: "lastName",
		label: "Last Name",
		value: "text",
	},
	{
		key: "email",
		label: "Email",
		value: "text",
	},
	{
		key: "address",
		label: "Address",
		value: "text",
	},
	{
		key: "phone",
		label: "Phone",
		value: "text",
	},
	{
		key: "dob",
		label: "DOB",
		value: "date",
	},
	{
		key: "role",
		label: "Role",
		value: [
			[Roles.SuperAdmin, "Super Admin"],
			[Roles.Admin, "Admin"],
			[Roles.Subscriber, "Subscriber"],
		],
	},
];

// elements
let loadButton = qs("#refresh-data") as HTMLButtonElement;

// event listeners
loadButton.addEventListener("click", async () => {
	// fetch users from json
	let userEntries = (await fetch("/data/users.json").then((e) => e.json())) as UserEntry[];

	let users = userEntries.map((data) => {
		return new User(data, fieldsToShow);
	});

	// create a user view
	new UserView(users, {
		container: qs("div.main-view-wrapper") as HTMLDivElement,
		fieldsToShow: fieldsToShow,
	});

	loadButton.innerText = "Refresh Data";
});
