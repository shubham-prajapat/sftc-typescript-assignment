export const qs = (selector: string, parent?: HTMLElement) => (parent || document).querySelector(selector);
export const qsa = (selector: string, parent?: HTMLElement) => (parent || document).querySelectorAll(selector);
export const parseDOM = (html: string) => {
	let dp = new DOMParser();
	let document = dp.parseFromString(html, "text/html");
	return document;
};

export const getTemplateContent = (templateId: string) => {
	const templateNode = (qs(`template#${templateId}`)! as HTMLTemplateElement).content.cloneNode(true);
	return templateNode;
};
