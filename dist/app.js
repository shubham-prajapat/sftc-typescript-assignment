"use strict";
// Definitions
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// INIT
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
}));
const forEachColumn = (rowEl, callBack) => { };
const clickListeners = {
    edit: (e) => {
        forEachColumn(e.currentTarget.closest("tr"), () => { });
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
        let row = e.currentTarget.closest("tr");
        row === null || row === void 0 ? void 0 : row.remove();
    },
    save: (e) => { },
    cancel: (e) => { },
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
