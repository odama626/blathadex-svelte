import type { Variant } from './data/items';

export function getSetFromArray(set) {
	return Object.entries(set)
		.filter(([_, value]) => value)
		.map(([key]) => key);
}

export const replaceStateWithQuery = (values: Record<string, string>) => {
	const url = new URL(window.location.toString());
	for (let [k, v] of Object.entries(values)) {
		if (!!v) {
			url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
		} else {
			url.searchParams.delete(k);
		}
	}
	history.replaceState({}, '', url);
};

export function sanitizeName(name: string): string {
	return encodeURIComponent(name.replace(/\s/g, '-').toLowerCase());
}

export function getCreatureId(creature) {
	try {
		let id = `${creature.sourceSheet.toLowerCase()}-${creature.num}`;
		return id;
	} catch (e) {
		console.log(creature, e);
	}
	return `${creature.sourceSheet.toLowerCase()}-${creature.num}`;
}

export const filterCreature = (filter, caught: string[]) => (creature) => {
	if (!filter.caught && caught.includes(getCreatureId(creature))) return false;
	if (filter.type.bug && creature.sourceSheet === 'Insects') return true;
	if (filter.type.fish && creature.sourceSheet === 'Fish') return true;
	if (filter.type.sea && creature.sourceSheet === 'Sea Creatures') return true;
	return false;
};

export const sortCreature = (sort, caught: string[]) => (a, b) => {
	if (sort === 'caught') {
		let ca = caught.includes(getCreatureId(a));
		let cb = caught.includes(getCreatureId(b));
		if (ca && !cb) return 1;
		if (!ca && cb) return -1;
	}

	// asc sorting
	if (['num'].includes(sort)) return a[sort] - b[sort];

	let diff = b[sort] - a[sort];

	if (!diff) diff = b.sell - a.sell;

	return diff;
};

export function getLargeVariantImage(variant: variant): string {
	if (!variant) return null;
	const key = [
		'image',
		'storageImage',
		'inventoryImage',
		'closetImage',
		'albumImage',
		'framedImage'
	].find((key) => variant[key]);
	return variant[key];
}

export function getItemImage(item): string {
	const variant = item?.variants?.[0];
	if (!variant) return null;
	const key = [
		'image',
		'inventoryImage',
		'closetImage',
		'albumImage',
		'framedImage',
		'storageImage'
	].find((key) => variant[key]);
	return variant[key];
}

const SHEET_GROUPS = {
	items: [
		'Housewares',
		'Miscellaneous',
		'Wall-mounted',
		'Wallpaper',
		'Floors',
		'Rugs',
		'Photos',
		'Posters',
		'Tools/Goods',
		'Fencing',
		'Tops',
		'Bottoms',
		'Dress-Up',
		'Headwear',
		'Accessories',
		'Socks',
		'Shoes',
		'Bags',
		'Umbrellas',
		'Clothing Other',
		'Music',
		'Fossils',
		'Artwork',
		'Other'
	],
	creatures: ['Insects', 'Fish', 'Sea Creatures'],
	construction: ['Construction'],
	recipes: ['Recipes'],
	achievements: ['Achievements'],
	villagers: ['Villagers'],
	'special-npcs': ['Special NPCs'],
	reactions: ['Reactions'],
	'message-cards': ['Message Cards'],
	'season-and-events': ['Seasons and Events']
};

export function getGroupFromSourceSheet(sourceSheet) {
	return Object.entries(SHEET_GROUPS).find(([key, set]) => set.includes(sourceSheet))[0];
}

export function getLocaleTime(hour) {
	return (hour % 12 || 12).toString() + (hour >= 12 ? 'pm' : 'am');
}

export function titleCase(name: string): string {
	return name
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}

export const MONTH_NAMES = [
	'Jan',
	'Feb',
	'Mar',
	'April',
	'May',
	'June',
	'July',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec'
];
