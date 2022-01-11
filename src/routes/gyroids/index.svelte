<script lang="ts">
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import itemsJson from '$lib/data/items.json';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { getItemImage, getSetFromArray, sanitizeName } from '$lib/utils';
	import { acquired, selected } from '../items/_store';
	import { slide } from 'svelte/transition';
	import BottomNav from '$lib/bottom-nav.svelte';

  const gyroidsJson = itemsJson.filter(i => i.sourceSheet === 'Gyroids');

	let ownedList = [];
	let isSelecting = getSetFromArray($selected).length > 0;

	$: ownedList = gyroidsJson.filter((villager) => $acquired[villager.name.toLowerCase()]);
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
			<button class="success" on:click={onMarkOwned}>Mark {selectedCount} as Found!</button>
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
				Mark {selectedCount} as Found!
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
				<h3>Acquired Gyroids</h3>
				<div class="grid">
					{#each ownedList as gyroid (gyroid.name)}
						<SelectableBlock
							label={gyroid.name}
							id={gyroid.name.toLowerCase()}
							image={getItemImage(gyroid)}
							href="/items/{sanitizeName(gyroid.name)}"
							on:click={click}
							on:long-press={longPress}
							selected={$selected[gyroid.name.toLowerCase()]}
						>
							<svelte:fragment slot="before">{gyroid.name}</svelte:fragment>
						</SelectableBlock>
					{/each}
				</div>
			</section>
		{/if}
		<section>
			<h3>All Gyroids</h3>
			<div class="grid">
				{#each gyroidsJson as gyroid (gyroid.name)}
					<SelectableBlock
						label={gyroid.name}
						id={gyroid.name.toLowerCase()}
						image={getItemImage(gyroid)}
						href="/items/{sanitizeName(gyroid.name)}"
						on:click={click}
						on:long-press={longPress}
						selected={$selected[gyroid.name.toLowerCase()]}
						acquired={$acquired[gyroid.name.toLowerCase()]}
					>
						<span slot="before">{gyroid.name}</span>
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
