import itemJson from '$lib/data/items.json';
import type { Items } from '$lib/data/items';
import { getItemImage, sanitizeName } from '$lib/utils';
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

function getSetItems(item) {
	return items.filter((i) => i.name !== item.name && i.set === item.set);
}

function consolidateIngredients(ingredients) {
	return ingredients
		.sort((a, b) => a.name.localeCompare(b.name))
		.reduce((result, next) => {
			if (next.name === result[result.length - 1]?.name) {
				result[result.length - 1].qty += next.qty;
			} else {
				result.push(next);
			}
			return result;
		}, []);
}

function getRecipe(name) {
	const recipe = recipes.find((r) => r.name === name);
	const additionalRecipes = [];
	let extendedMaterialDetails = [];
	let materialDetails = [];

	for (const [name, qty] of Object.entries(recipe.materials)) {
		const item = items.find((i) => i.name === name);
		if (item.diy) {
			recipe.hasDiy = true;
			const nestedRecipe = getRecipe(item.name);
			extendedMaterialDetails.push(
				...nestedRecipe.materialDetails.map((d) => {
					d.qty *= qty;
					return d;
				})
			);
			extendedMaterialDetails = consolidateIngredients(extendedMaterialDetails);

			additionalRecipes.push(...nestedRecipe.additionalRecipes);
			nestedRecipe.materialDetails;
			// recipe.additionalRecipes = null;
			// recipe.materialDetails = null;
			additionalRecipes.push(nestedRecipe);
		} else {
			extendedMaterialDetails.push({ name, qty, image: getItemImage(item) });
		}
		materialDetails.push({ name, qty, image: getItemImage(item) });
	}

	recipe.extendedMaterialDetails = extendedMaterialDetails;
	recipe.additionalRecipes = additionalRecipes;
	recipe.materialDetails = consolidateIngredients(materialDetails);
	return recipe;
}

export function get({ params }) {
	try {
		const itemName = encodeURIComponent(params.item.toLowerCase());

		const item = items.find((i) => sanitizeName(i.name) === itemName);
		const similar = getSimilar(item);
		const recipe = item.diy ? getRecipe(item.name) : null;
		const setItems = item.set && getSetItems(item);

		return {
			body: {
				item,
				recipe,
				similar,
				setItems
			}
		};
	} catch (e) {
		console.error(e);
	}
}
