interface FieldSchema {
	key: string;
	label: string;
	value: "text" | "number" | "date" | Array<[value: number | string | boolean, label: string]>;
}

interface Validations {
	required: boolean;
	min: number;
	max: number;
	minLength: number;
	maxLength: number;
	shouldBeEmail: boolean;
	shouldBeNumeric: boolean;
}
