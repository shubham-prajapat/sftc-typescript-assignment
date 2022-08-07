import UserView from "./components/UserView.js";
import { qs } from "./utils/dom.js";

// elements
let loadButton = qs("#refreshData") as HTMLButtonElement;

// event listeners
loadButton.addEventListener("click", async () => {
	// fetch users from json
	let users = await fetch("/data/users.json").then((e) => e.json());

	// create a user view
	let userView = new UserView(users, {
		container: qs("div.user-view-wrapper") as HTMLDivElement,
	});
	console.log(userView);
});
