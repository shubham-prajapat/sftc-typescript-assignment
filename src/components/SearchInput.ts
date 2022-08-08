import { qs } from "../utils/dom.js";
import TemplateRenderer from "./TemplateRenderer.js";

interface Options {
	container: HTMLElement;
	handleSearch: (query: string) => void;
}

class SearchInput extends TemplateRenderer {
	constructor(public options: Options) {
		super(qs("template#search-input") as HTMLTemplateElement, options.container);
		this.configure();
	}
	configure = () => {
		const input = qs("input", this.options.container) as HTMLInputElement;
		input.addEventListener("input", (e) => {
			if (!e.currentTarget) return;
			let query = (e.currentTarget as HTMLInputElement).value;
			this.options.handleSearch(query);
		});
	};
}

export default SearchInput;
