import allJson from '$lib/data/all.json';
import type { Item } from '$lib/data/all';

function percentageMatch(test, str) {
	const index = str?.toLowerCase()?.indexOf(test) ?? -1;
	if (index === -1) return 0;
	return (str.length - index) / str.length;
}

function getRelevance(query, item) {
	if (!query?.length) return 0;
  const q = query.toLowerCase().trim();
	let rel = 0;
	rel += percentageMatch(q, item.name);
  rel += percentageMatch(q, item.weather);
  rel += percentageMatch(q, item.whereHow);

	return rel;
}

export async function get({ url }) {
	console.log(url.searchParams.get('q'));
	try {
		const q = url.searchParams.get('q').toLowerCase();

		const items = (allJson as Item[])
			.filter((item) => getRelevance(q, item) > 0)
			.sort((a, b) => getRelevance(q, b) - getRelevance(q, a));

		return {
			body: { items }
		};
	} catch (e) {
		console.error(e);
		return {
			status: 500,
			body: e
		};
	}
}
