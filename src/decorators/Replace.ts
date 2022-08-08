export default function Replace(replacer: Array<{ key: string; from: number | string; to: string }>) {
	return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
		const originalGetter = descriptor.get;
		descriptor.get = function () {
			const data = { ...originalGetter?.bind(this)() };
			for (let entry of replacer) {
				if (data[entry.key].toString() === entry.from.toString()) {
					data[entry.key] = entry.to;
				}
			}
			return data;
		};
	};
}
