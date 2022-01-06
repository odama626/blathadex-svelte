import villagerJson from '$lib/data/villagers.json';
import type { Villagers } from '$lib/data/villagers';
import { sanitizeName } from '$lib/utils';

const villagers = villagerJson as Villagers[];

export async function get({ params }) {
	try {
		const villagerName = encodeURIComponent(params.villager.toLowerCase());
		const villager = villagers.find((v) => sanitizeName(v.name) === villagerName);
		const villagerSpecies = villager.species.toLowerCase();
		const similarSpecies = villagers.filter(
			(v) => v.name !== villager.name && v.species.toLowerCase() === villagerSpecies
		);

		return {
			body: {
				villager,
        similarSpecies
			}
		};
	} catch (error) {
		return {
			status: 500,
			error
		};
	}
}
