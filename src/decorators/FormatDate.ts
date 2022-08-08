import { getMonthLabel, twoDigit } from "../utils/date.js";

export default function FormatDate(key: string) {
	return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
		const originalGetter = descriptor.get;
		descriptor.get = function () {
			const data = { ...originalGetter?.bind(this)() };
			if (!data._dateFormatted && data[key]) {
				let date = new Date(data[key]);
				data[key] = `${twoDigit(date.getDate())} ${getMonthLabel(date.getMonth())} ${twoDigit(
					date.getFullYear()
				)}`;
				data._dateFormatted = true;
			}
			return data;
		};
	};
}
