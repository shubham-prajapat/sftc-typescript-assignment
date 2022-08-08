class Validator {
	static run(value: number | string, validations: Partial<Validations>) {
		if (!!!value) {
			return false;
		}
		let isValid = true;
		if (validations.required) {
			isValid = isValid && value.toString().trim().length > 0;
		}
		if (validations.min !== undefined && typeof value === "number") {
			isValid = isValid && value >= validations.min;
		}
		if (validations.max !== undefined && typeof value === "number") {
			isValid = isValid && value <= validations.max;
		}
		if (typeof value === "string") {
			if (validations.minLength !== undefined) {
				isValid = isValid && value.length >= validations.minLength;
			}
			if (validations.maxLength !== undefined) {
				isValid = isValid && value.length <= validations.maxLength;
			}
			if (validations.shouldBeEmail) {
				let emailRegex = /\S+@\S+\.\S+/;
				let matches = emailRegex.test(value);
				isValid = isValid && matches;
			}
		}
		if (validations.shouldBeNumeric) {
			let numericRegex = /^[0-9]*$/;
			let matches = numericRegex.test(value.toString());
			isValid = isValid && matches;
		}
		return isValid;
	}
}

export default Validator;
