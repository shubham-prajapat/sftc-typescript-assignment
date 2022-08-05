// Definitions

enum Role {
	SuperAdmin = 1,
	Admin,
	Subscriber,
}

class User {
	constructor(
		public firstName: string,
		public middleName: string,
		public lastName: string,
		public email: string,
		public address: string,
		public phone: string,
		public role: Role
	) {}

	get roleString() {
		switch (this.role) {
			case Role.SuperAdmin:
				return "Super Admin";
			case Role.Admin:
				return "Admin";
			case Role.Subscriber:
				return "Subscriber";
			default:
				return this.role;
		}
	}
}

// INIT

// Elements
const refreshData = document.querySelector("#refreshData") as HTMLButtonElement;
const rowWrapper = document.querySelector("#tbody")!;

// Event Listeners
refreshData.addEventListener("click", async () => {
	let data: User[] = await fetch("/users.json").then((r) => r.json());
	let users: User[] = [];
	for (let entry of data) {
		let user = new User(
			entry.firstName,
			entry.middleName,
			entry.lastName,
			entry.email,
			entry.address,
			entry.phone,
			entry.role
		);
		users.push(user);
	}
	populateTable(users);
});

interface ClickListeners {
	[prop: string]: EventListener;
}

const forEachColumn = (rowEl: HTMLTableRowElement, callBack: () => void) => {};

const clickListeners: ClickListeners = {
	edit: (e) => {
		forEachColumn((e.currentTarget as HTMLButtonElement).closest("tr") as HTMLTableRowElement, () => {});
		/* ([...row.children] as HTMLTableCellElement[]).forEach((element) => {
			if (element.dataset.actioncolumn) {
				element.innerHTML = "";
				addActionButton("Save", element, clickListeners.save, "primary");
				addActionButton("Cancel", element, clickListeners.cancel, "secondary");
				return;
			}
			let initialValue = element.innerText;
			element.innerHTML = `<input type="text" value="${initialValue}" data-initalvalue="${initialValue}" />`;
		}); */
	},
	delete: (e) => {
		let row = (e.currentTarget as HTMLButtonElement).closest("tr");
		row?.remove();
	},
	save: (e) => {},
	cancel: (e) => {},
};

const populateTable = (users: User[]) => {
	// empty previous list
	rowWrapper.innerHTML = "";

	// iterate over users and push as tr -> td
	for (let user of users) {
		const row = document.createElement("tr");
		row.dataset.identity = user.email;
		const dataToShow: Array<keyof User> = [
			"firstName",
			"middleName",
			"lastName",
			"email",
			"address",
			"phone",
			"roleString",
		];

		for (let column of dataToShow) {
			const td = document.createElement("td");
			td.innerHTML = user[column].toString();
			row.appendChild(td);
		}

		const td = document.createElement("td");
		td.dataset.actioncolumn = "true";
		addActionButton("Edit", td, clickListeners.edit, "primary");
		addActionButton("Delete", td, clickListeners.delete, "secondary");
		row.appendChild(td);

		rowWrapper.appendChild(row);
	}
};

const addActionButton = (text: string, parent: HTMLElement, onClick: EventListener, type: "primary" | "secondary") => {
	const button = document.createElement("button");
	button.className = "btn ".concat(type === "secondary" ? "grey lighten-1" : "purple darken-4");
	button.innerHTML = text;
	button.addEventListener("click", onClick);
	parent.appendChild(button);
};
