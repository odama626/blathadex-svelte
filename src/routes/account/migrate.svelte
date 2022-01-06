<script lang="ts">
	import creatureJson from '$lib/data/creatures.json';
	import itemJson from '$lib/data/items.json';
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import { grownFlowers } from '$lib/store';
	import { getCreatureId, getItemImage } from '$lib/utils';
	import { acquired as acquiredCreatures } from '../creatures/_store';
	import { acquired as acquiredItems } from '../items/_store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	function getMigratedCreatureId(item) {
		const reference = {
			fish: 'fish',
			bug: 'Insects'
		};
		return `${reference[item.type]}-${item.no}`;
	}

	function getMigratedFlowerId(flower) {
		return `${flower.genus}-${flower.color}`;
	}

	let creatures = [];
	let items = [];
	let flowers = [];
	let selectedCreatures = {};
	let selectedItems = {};
	let selectedFlowers = {};

	function importData() {
		acquiredCreatures.update((cur) => ({ ...cur, ...selectedCreatures }));
		acquiredItems.update((cur) => ({ ...cur, ...selectedItems }));
		grownFlowers.update((cur) => ({ ...cur, ...selectedFlowers }));
		indexedDB.deleteDatabase('critterDb');
		goto(`/creatures`);
	}

	onMount(async () => {
		const databases = await indexedDB.databases();
		if (!databases.find((database) => database.name === DATABASE_NAME)) {
			// nothing to do
			return;
		}

		const { default: Dexie } = await import('dexie');

		const db = new Dexie('critterDb');
		db.version(1).stores({
			caught: `++id, type, no`
		});

		db.version(2).stores({
			caught: `++id, [type+no]`
		});

		db.version(3).stores({
			caught: `++id, [type+no]`,
			grown: `++id, [genus+color]`,
			collected: `++id, name`
		});

		creatures = await db.caught.toArray().then((records) => {
			const ids = records.map(getMigratedCreatureId);
			return creatureJson.filter((creature) => {
				const creatureId = getCreatureId(creature);
				return ids.find((id) => id === creatureId);
			});
		});
		selectedCreatures = creatures.reduce((group, creature) => {
			group[getCreatureId(creature)] = true;
			return group;
		}, {});

		flowers = await db.grown.toArray();
		selectedFlowers = flowers.reduce((group, flower) => {
			group[getMigratedFlowerId(flower)] = true;
			return group;
		}, {});

		items = await db.collected.toArray().then((records) => {
			const names = records.map((item) => item.name.toLowerCase());
			return itemJson.filter((item) => {
				const itemName = item.name.toLowerCase();
				return names.find((name) => itemName === name);
			});
		});
		selectedItems = items.reduce((group, item) => {
			group[item.name.toLowerCase()] = true;
			return group;
		}, {});
	});
</script>

<Header>
	<svelte:fragment slot="actions"><Search desktop /></svelte:fragment>
</Header>
<div class="container">
	<main>
		{#if items.length || flowers.length || creatures.length}
			<section>
				<p>We tried our best, does this look right?</p>
				<p>
					We support magic link logins now! If you want to access your data on more devices you need
					to login with your email
				</p>
				<div>
					<button on:click={importData}>Import my Data</button>
				</div>
			</section>
		{:else}
			<section>
				<p>We weren't able to find any data to import</p>
			</section>
		{/if}
		{#if creatures.length > 0}
			<section>
				<h3>Creatures</h3>
				<div class="grid">
					{#each creatures as creature (getCreatureId(creature))}
						<div
							class="item block"
							on:click={() => {
								const id = getCreatureId(creature);
								selectedCreatures[id] = !selectedCreatures[id];
							}}
							data-selected={selectedCreatures[getCreatureId(creature)]}
						>
							<img src={creature.iconImage} alt={creature.name} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
		{#if items.length > 0}
			<section>
				<h3>Items</h3>
				<div class="grid">
					{#each items as item (item.name)}
						<div
							class="item block"
							on:click={() => {
								const id = item.name.toLowerCase();
								selectedItems[id] = !selectedItems[id];
							}}
							data-selected={selectedItems[item.name.toLowerCase()]}
						>
							<img src={getItemImage(item)} alt={item.name} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
		{#if flowers.length > 0}
			<section>
				<h3>Flowers</h3>
				<p>
					Flowers have yet to be recreated in the new version but we will save what we found for
					when it does get added
				</p>
				<div class="grid">
					{#each flowers as flower (flower.id)}
						<div
							class="item block"
							style="display: flex; align-items: center; justify-content: center;"
							data-selected={selectedFlowers[getMigratedFlowerId(flower)]}
							on:click={() => {
								const id = getMigratedFlowerId(flower);
								selectedFlowers[id] = !selectedFlowers[id];
							}}
						>
							{flower.color}
							{flower.genus}
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
