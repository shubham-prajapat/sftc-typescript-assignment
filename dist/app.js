"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Definitions
var Role;
(function (Role) {
    Role[Role["SuperAdmin"] = 1] = "SuperAdmin";
    Role[Role["Admin"] = 2] = "Admin";
    Role[Role["Subscriber"] = 3] = "Subscriber";
})(Role || (Role = {}));
class User {
    constructor(firstName, middleName, lastName, email, address, phone, role) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.role = role;
    }
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
// Elements
const refreshData = document.querySelector("#refreshData");
const rowWrapper = document.querySelector("#tbody");
// Event Listeners
refreshData.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetch("/users.json").then((r) => r.json());
    let users = [];
    for (let entry of data) {
        let user = new User(entry.firstName, entry.middleName, entry.lastName, entry.email, entry.address, entry.phone, entry.role);
        users.push(user);
    }
    populateTable(users);
    refreshData.innerHTML = "Refresh Data";
}));
const clickListeners = {
    edit: (e) => {
        editMode("EDIT", e.currentTarget.closest("tr"));
    },
    delete: (e) => {
        let row = e.currentTarget.closest("tr");
        row === null || row === void 0 ? void 0 : row.remove();
    },
    save: (e) => {
        editMode("SAVE", e.currentTarget.closest("tr"));
    },
    cancel: (e) => {
        editMode("CANCEL", e.currentTarget.closest("tr"));
    },
};
const editMode = (action, row) => {
    [...row.children].forEach((element) => {
        if (element.dataset.actioncolumn) {
            element.innerHTML = "";
            if (action === "EDIT") {
                addActionButton("Save", element, clickListeners.save, "primary");
                addActionButton("Cancel", element, clickListeners.cancel, "secondary");
            }
            else if (["CANCEL", "SAVE"].includes(action)) {
                addActionButton("Edit", element, clickListeners.edit, "primary");
                addActionButton("Delete", element, clickListeners.delete, "secondary");
            }
            return;
        }
        if (action === "EDIT") {
            let initialValue = element.innerText;
            element.innerHTML = `<input type="text" value="${initialValue}" data-initalvalue="${initialValue}" />`;
        }
        else if (action === "SAVE") {
            let input = element.querySelector("input");
            element.innerHTML = input.value;
        }
        else if (action === "CANCEL") {
            let input = element.querySelector("input");
            element.innerHTML = input.dataset.initalvalue || "";
        }
    });
};
const populateTable = (users) => {
    // empty previous list
    rowWrapper.innerHTML = "";
    // iterate over users and push as tr -> td
    for (let user of users) {
        const row = document.createElement("tr");
        row.dataset.identity = user.email;
        const dataToShow = [
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
const addActionButton = (text, parent, onClick, type) => {
    const button = document.createElement("button");
    button.className = "btn ".concat(type === "secondary" ? "grey lighten-1" : "purple darken-4");
    button.innerHTML = text;
    button.addEventListener("click", onClick);
    parent.appendChild(button);
};
