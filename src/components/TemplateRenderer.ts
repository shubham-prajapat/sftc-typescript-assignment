// "TemplateRenderer" takes <template> element and appends it into the container provided

abstract class TemplateRenderer {
	constructor(public template: HTMLTemplateElement, public container: HTMLElement) {
		this.run();
	}
	run = () => {
		this.container.innerHTML = "";
		const templateNode = this.template.content.cloneNode(true);
		this.container.appendChild(templateNode);
	};
}

export default TemplateRenderer;
