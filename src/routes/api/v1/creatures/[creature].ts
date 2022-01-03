import creatureJson from '$lib/data/creatures.json';
import type { Creatures } from '$lib/data/creatures';
import { sanitizeName } from '$lib/utils';

const creatures = creatureJson as Creatures[];

function getMatchCount(creature, match) {
	let count = 0;
	if (creature.num === match.num) return 0;
	if (creature.whereHow && creature.whereHow === match.whereHow) count++;
	if (creature.weather && creature.weather !== 'Any weather' && creature.weather == match.weather)
		count++;
	return count;
}

export function get({ params }) {
	try {
		const creatureName = encodeURIComponent(params.creature.toLowerCase());

		const creature = creatures.find((i) => sanitizeName(i.name) === creatureName);
		const similar = creatures.filter((c) => getMatchCount(c, creature) > 0);

		return {
			body: {
				creature,
				similar
			}
		};
	} catch (e) {
		console.error(e);
	}
}
