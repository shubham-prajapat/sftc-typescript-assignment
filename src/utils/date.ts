export const twoDigit = (d: number) => {
	if (d < 10) {
		return `0${d}`;
	}
	return d.toString();
};

export const getMonthLabel = (index: number) => {
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[index];
};
