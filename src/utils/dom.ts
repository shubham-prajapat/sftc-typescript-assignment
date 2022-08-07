export const qs = (selector: string, parent?: HTMLElement) => (parent || document).querySelector(selector);
export const qsa = (selector: string, parent?: HTMLElement) => (parent || document).querySelectorAll(selector);
