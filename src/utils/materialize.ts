import { qs } from "./dom.js";

export const closePopup = (popupId: string) => {
	let instance = window.M.Modal.getInstance(qs(`#${popupId}`));
	if (instance) {
		instance.close();
	}
};
