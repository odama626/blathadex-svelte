<script lang="ts">
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import flowersJson from '$lib/data/flowers.json';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { getItemImage, getSetFromArray, sanitizeName } from '$lib/utils';
	import { acquired, selected } from '../items/_store';
	import { slide } from 'svelte/transition';
	import BottomNav from '$lib/bottom-nav.svelte';

	let ownedList = [];
	let isSelecting = getSetFromArray($selected).length > 0;

	$: ownedList = flowersJson.filter((villager) => $acquired[villager.name.toLowerCase()]);
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
		{#if ownedList.length > 0}
			<section>
				<h3>Grown Flowers</h3>
				<div class="grid">
					{#each ownedList as flower (flower.name)}
						<SelectableBlock
							label={flower.name}
							id={flower.name.toLowerCase()}
							image={getItemImage(flower)}
							href="/items/{sanitizeName(flower.name)}"
							on:click={click}
							on:long-press={longPress}
							selected={$selected[flower.name.toLowerCase()]}
						>
							<svelte:fragment slot="before">{flower.name}</svelte:fragment>
						</SelectableBlock>
					{/each}
				</div>
			</section>
		{/if}
		<section>
			<h3>All Flowers</h3>
			<div class="grid">
				{#each flowersJson as flower (flower.name)}
					<SelectableBlock
						label={flower.name}
						id={flower.name.toLowerCase()}
						image={getItemImage(flower)}
						href="/items/{sanitizeName(flower.name)}"
						on:click={click}
						on:long-press={longPress}
						selected={$selected[flower.name.toLowerCase()]}
						acquired={$acquired[flower.name.toLowerCase()]}
					>
						<span slot="before">{flower.name}</span>
					</SelectableBlock>
				{/each}
			</div>
		</section>
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
