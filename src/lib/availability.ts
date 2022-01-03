export const filterByMonth = (hemisphere, month) => (creature) => {
	const activeMonths = creature.activeMonths[hemisphere];
	return !!activeMonths.find((x) => x.month === month);
};

export function getMonthAvailability(creatures) {
	let months = [];
	for (let i = 0; i < 12; i++) {
		months[i] = { available: creatures.filter(filterByMonth('northern', i + 1)) };
	}

	months.map((month, i) => {
		month.leaving = month.available
			.filter((x) => !months.at((i + 1) % 12).available.find((y) => y.name === x.name))
			.map((creature) => creature.name);

		month.new = month.available.filter(
			(x) => !months.at(i - 1).available.find((y) => y.name === x.name)
		);
		return month;
	});
	return months;
}

export function inHoursInclusive(hour, from, to) {
	if (from > to) {
		return hour >= from || hour < to;
	} else {
		return hour >= from && hour < to;
	}
}

const filterByHour = (month, hour) => (creature) => {
	const activeMonth = creature.activeMonths['northern'][0]; //creature.activeMonths['northern'].find((x) => x.month === month);
	if (activeMonth.isAllDay) return true;
	const [from = 0, to = 0] = activeMonth?.activeHours?.map((x) => parseInt(x)) || [];
	return inHoursInclusive(hour, from, to);
};

export function getDayAvailability(creatures) {
	let hours = [];
	for (let i = 0; i < 24; i++) {
		hours[i] = { available: creatures.filter(filterByHour(1, i)) };
	}

	return hours.map((hour, i) => {
		hour.leaving = hour.available
			.filter((x) => !hours.at((i + 1) % 24).available.find((y) => y.name === x.name))
			.map((creature) => creature.name);

		hour.new = hour.available.filter(
			(x) => !hours.at(i - 1).available.find((y) => y.name === x.name)
		);
		return hour;
	});
}

export function groupByLocation(creatures) {
	const groups = creatures.reduce((groups, next) => {
		const where = next.whereHow || (next.sourceSheet === 'Sea Creatures' && 'Diving');
		if (!groups[where]) groups[where] = [];
		groups[where].push(next);
		return groups;
	}, {});

	return Object.entries(groups)
		.map(([header, items]) => ({ header, items }))
		.sort((a, b) => a.header.localeCompare(b.header));
}
