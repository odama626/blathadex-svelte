<script lang="ts">
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import flowersJson from '$lib/data/flowers.json';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { getItemImage, getSetFromArray, sanitizeName, titleCase } from '$lib/utils';
	import { acquired, selected } from '../items/_store';
	import { slide } from 'svelte/transition';
	import BottomNav from '$lib/bottom-nav.svelte';
	import type { Flower } from '$lib/data/flowers';

	let ownedList = [];
	let isSelecting = getSetFromArray($selected).length > 0;

	const flowers: Flower[] = flowersJson.sort(
		(a, b) => a.genus.localeCompare(b.genus) || a.color.localeCompare(b.color)
	);

	const groupedFlowers = Object.entries(
		flowers.reduce((groups, flower) => {
			groups[flower.genus] = groups[flower.genus] || [];
			groups[flower.genus].push(flower);
			return groups;
		}, {})
	).map(([title, items]) => ({ title, items }));

	$: ownedList = flowers.filter((flower) => $acquired[flower.name.toLowerCase()]);
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

	function onMarkOwned() {
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
			<button class="success" on:click={onMarkOwned}>Mark {selectedCount} as Grown!</button>
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
			<button class="success" on:click={onMarkOwned}>
				Mark {selectedCount} as Grown!
			</button>
		</header>
	</nav>
{:else}
	<BottomNav />
{/if}
<div class="container">
	<main>
		{#each groupedFlowers as group (group.title)}
			<section>
				<h3>{titleCase(group.title)}</h3>
				<div class="grid">
					{#each group.items as flower (flower.name)}
						{@const id = flower.name.toLowerCase()}
						<SelectableBlock
							label={flower.name}
							{id}
							image={getItemImage(flower)}
							href="/items/{sanitizeName(flower.name)}"
							on:click={click}
							on:long-press={longPress}
							selected={$selected[id]}
							acquired={$acquired[id]}
						/>
					{/each}
				</div>
			</section>
		{/each}
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
