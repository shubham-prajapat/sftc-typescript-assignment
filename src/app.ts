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

interface ClickListeners {
	[prop: string]: EventListener;
}

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
	refreshData.innerHTML = "Refresh Data";
});

const clickListeners: ClickListeners = {
	edit: (e) => {
		editMode("EDIT", (e.currentTarget as HTMLButtonElement).closest("tr") as HTMLTableRowElement);
	},
	delete: (e) => {
		let row = (e.currentTarget as HTMLButtonElement).closest("tr");
		row?.remove();
	},
	save: (e) => {
		editMode("SAVE", (e.currentTarget as HTMLButtonElement).closest("tr") as HTMLTableRowElement);
	},
	cancel: (e) => {
		editMode("CANCEL", (e.currentTarget as HTMLButtonElement).closest("tr") as HTMLTableRowElement);
	},
};

const editMode = (action: "EDIT" | "CANCEL" | "SAVE", row: HTMLTableRowElement) => {
	([...row.children] as HTMLTableCellElement[]).forEach((element) => {
		if (element.dataset.actioncolumn) {
			element.innerHTML = "";
			if (action === "EDIT") {
				addActionButton("Save", element, clickListeners.save, "primary");
				addActionButton("Cancel", element, clickListeners.cancel, "secondary");
			} else if (["CANCEL", "SAVE"].includes(action)) {
				addActionButton("Edit", element, clickListeners.edit, "primary");
				addActionButton("Delete", element, clickListeners.delete, "secondary");
			}
			return;
		}

		if (action === "EDIT") {
			let initialValue = element.innerText;
			element.innerHTML = `<input type="text" value="${initialValue}" data-initalvalue="${initialValue}" />`;
		} else if (action === "SAVE") {
			let input = element.querySelector("input") as HTMLInputElement;
			element.innerHTML = input.value;
		} else if (action === "CANCEL") {
			let input = element.querySelector("input") as HTMLInputElement;
			element.innerHTML = input.dataset.initalvalue || "";
		}
	});
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
