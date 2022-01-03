import itemJson from '$lib/data/items.json';
import type { Items } from '$lib/data/items';
import { getVariantImage, sanitizeName } from '$lib/utils';
import recipeJson from '$lib/data/recipes.json';
import type { Recipes } from '$lib/recipes';

const items = itemJson as Items[];
const recipes = recipeJson as Recipes[];

function getMatchCount(item, match) {
	let count = 0;
	if (item.set && item.set === match.set) count++;
	if (item.series && item.series === match.series) count++;
	if (item.tag && item.tag === match.tag) count++;
	if (item.patternTitle && item.patternTitle === match.patternTitle) count++;
	return count;
}

function getSimilar(match) {
	return items
		.filter((item) => item.name !== match.name && getMatchCount(item, match) > 0)
		.sort((a, b) => getMatchCount(b, match) - getMatchCount(a, match));
}

function getRecipe(name) {
	const recipe = recipes.find((r) => r.name === name);
	recipe.materialDetails = Object.entries(recipe.materials).map(([name, qty]) => {
		const item = items.find((i) => i.name === name);
		const variant = item?.variants?.[0];

		return { name, qty, image: getVariantImage(variant) };
	});
	return recipe;
}

export function get({ params }) {
	try {
		const itemName = encodeURIComponent(params.item.toLowerCase());

		const item = items.find((i) => sanitizeName(i.name) === itemName);
		const similar = getSimilar(item);
		const recipe = item.diy ? getRecipe(item.name) : null;

		return {
			body: {
				item,
				recipe,
				similar
			}
		};
	} catch (e) {
		console.error(e);
	}
}
