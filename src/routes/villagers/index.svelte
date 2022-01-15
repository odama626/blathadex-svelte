<script lang="ts">
	import BottomNav from '$lib/bottom-nav.svelte';
	import villagersJson from '$lib/data/villagers.json';
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { getSetFromArray, sanitizeName, titleCase } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import { acquired, selected } from './_store';

	const villagers = villagersJson.sort(
		(a, b) => a.species.localeCompare(b.species) || a.name.localeCompare(b.name)
	);
	const villagerGroups = Object.entries(
		villagers.reduce((group, next) => {
			group[next.species] = group[next.species] || [];
			group[next.species].push(next);
			return group;
		}, {})
	).map(([title, items]) => ({ title: titleCase(title), items }));

	let neighbors = [];
	let isSelecting = getSetFromArray($selected).length > 0;

	$: neighbors = villagers
		.filter((villager) => $acquired[villager.name.toLowerCase()])
		.sort((a, b) => a.name.localeCompare(b.name));
	$: selectedCount = getSetFromArray($selected).length;

	function toggle(target) {
		const { id } = target.dataset;
		let x = !$selected[id];
		target.dataset.selected = x;
		$selected[id] = x;
	}

	function longPress(e) {
		toggle(e.currentTarget);
		isSelecting = e.currentTarget.dataset.id;
	}

	function click(e) {
		if (!isSelecting) return;
		e.stopPropagation();
		e.preventDefault();
		if (isSelecting !== e.currentTarget.dataset.id) toggle(e.currentTarget);
		isSelecting = selectedCount > 0;
	}

	function onMarkNeighbors() {
		acquired.update((cur) => ({
			...cur,
			...$selected
		}));
		selected.set({});
		isSelecting = false;
	}

	function onCancelSelection() {
		document
			.querySelectorAll('[data-selected="true"]')
			.forEach((node) => (node.dataset.selected = false));
		selected.set({});
		isSelecting = false;
	}
</script>

<Header>
	<svelte:fragment slot="actions">
		<Search desktop />
	</svelte:fragment>
</Header>
<nav data-desktop class="bottom">
	{#if selectedCount > 0}
		<header transition:slide|local>
			<button class="error" on:click={onCancelSelection}>Cancel</button>
			<button class="success" on:click={onMarkNeighbors}>Mark {selectedCount} as Neighbors!</button>
		</header>
	{/if}
</nav>
{#if selectedCount > 0}
	<nav
		transition:slide|local
		data-mobile
		data-selection
		style="z-index: 19;"
		class="bottom selection"
	>
		<header>
			<button class="error" on:click={onCancelSelection}> Cancel </button>
			<button class="success" on:click={onMarkNeighbors}>
				Mark {selectedCount} as Neighbors!
			</button>
		</header>
	</nav>
{:else}
	<BottomNav />
{/if}
<div class="container">
	<main>
		{#if neighbors.length > 0}
			<section>
				<h3>Neighbors</h3>
				<div class="grid">
					{#each neighbors as villager (villager.name)}
						{@const id = villager.name.toLowerCase()}
						<SelectableBlock
							label={villager.name}
							{id}
							acquired={$acquired[id]}
							image={villager.iconImage}
							href="/villagers/{sanitizeName(villager.name)}"
							on:click={click}
							on:long-press={longPress}
							selected={$selected[id]}
						>
							<svelte:fragment slot="before">{villager.name}</svelte:fragment>
						</SelectableBlock>
					{/each}
				</div>
			</section>
		{/if}
		{#each villagerGroups as group (group.title)}
			<section>
				<h3>{group.title}</h3>
				<div class="grid">
					{#each group.items as villager (villager.name)}
						{@const id = villager.name.toLowerCase()}
						<SelectableBlock
							label={villager.name}
							{id}
							image={villager.iconImage}
							href="/villagers/{sanitizeName(villager.name)}"
							on:click={click}
							on:long-press={longPress}
							selected={$selected[id]}
							acquired={$acquired[id]}
						>
							<span slot="before">{villager.name}</span>
						</SelectableBlock>
					{/each}
				</div>
			</section>
		{/each}
		<!-- <section>
			<h3>All Villagers</h3>
			<div class="grid">
				{#each villagers as villager (villager.name)}
					{@const id = villager.name.toLowerCase()}
					<SelectableBlock
						label={villager.name}
						{id}
						image={villager.iconImage}
						href="/villagers/{sanitizeName(villager.name)}"
						on:click={click}
						on:long-press={longPress}
						selected={$selected[id]}
						acquired={$acquired[id]}
					>
						<span slot="before">{villager.name}</span>
					</SelectableBlock>
				{/each}
			</div>
		</section> -->
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
