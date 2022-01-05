<script lang="ts">
	import BackButton from '$lib/vectors/back.svg';
	import CloseIcon from '$lib/vectors/closeButton.svg';
	import SearchIcon from '$lib/vectors/searchButton.svg';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { caught, store } from './store';
	import Checkmark from '$lib/vectors/checkmark.svg';

	import { getRouteFromSourceSheet, getItemImage, sanitizeName, getCreatureId } from './utils';
	import debounce from 'lodash.debounce';

	export let inline = false;
	export let value = '';
	export let hideResults = false;
	export let desktop = false;
	let input;
	let state;

	let items = [];

	async function updateResults() {
		if (!value) return (items = []);
		if (value.length < 3) return;
		state = 'loading';
		const url = new URL(`/api/v1/search`, location.origin);
		url.searchParams.set('q', value);
		const result = await fetch(url.toString()).then((r) => r.json());
		items = result.items;
		state = 'done';
	}

	const debouncedUpdate = debounce(updateResults, 500);

	onMount(() => {
		function searchListener(e) {
			console.log(e);
			store.set(true, 'isSearching');
		}
		document.addEventListener('open-search', searchListener);

		return () => {
			document.removeEventListener('open-search', searchListener);
		};
	});

	$: value, debouncedUpdate();

	$: if ($store.isSearching)
		tick().then(() => {
			state = '';
			input.focus();
			input.select();
		});
</script>

<div data-desktop={desktop} on:click={() => store.set((s) => !s, 'isSearching')}>
	{#if $store.isSearching}
		<BackButton style="color: white; cursor: pointer" />
	{:else}
		<SearchIcon style="cursor:pointer;" />
	{/if}
</div>

{#if $store.isSearching}
	<div transition:fade|local class="shade" on:click={() => store.set(false, 'isSearching')} />
	<div transition:fade|local class="search overlay" class:attached={!inline}>
		<div class="input">
			<SearchIcon class="input start" />
			<div class="input end" on:click={() => store.set(false, 'isSearching')}>
				<CloseIcon class="input end" style="cursor: pointer" />
			</div>
			<input bind:this={input} bind:value placeholder="Search" />
		</div>
		{#if !hideResults}
			<div class="results">
				{#if state === 'loading'}
					<div class="info">Loading</div>
				{:else if state === 'done' && items.length}
					<VirtualList {items} let:item>
						<a
							on:click={() => store.set((s) => false, 'isSearching')}
							class="item"
							style="text-decoration: none;"
							href="/{getRouteFromSourceSheet(item.sourceSheet)}/{sanitizeName(item.name)}"
						>
							<div class="stack">
								<img src={getItemImage(item) ?? item?.iconImage ?? item?.image} />
								{#if $caught[getCreatureId(item)]}
									<Checkmark style="padding: 0;" class="badge bottom left" />
								{/if}
							</div>
							{item.name}
						</a>
					</VirtualList>
				{:else if !value?.length || state !== 'done'}
					<div class="info">Start typing to search</div>
				{:else}
					<div class="info">No results</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.shade {
		backdrop-filter: blur(5px);
		top: var(--header-height);
		width: 100%;
		left: 0;
		bottom: 0;
	}

	.info {
		display: flex;
		justify-content: center;
		padding: 2rem;
		font-size: 2rem;
		color: var(--accent);
		filter: drop-shadow(1px 1px 1px var(--primary));
	}

	.results {
		height: calc(100vh - 143px);
		width: 100%;
	}

	.item {
		display: flex;
		align-items: center;
		background-color: var(--section-background);

		> :first-child {
			width: 52px;
			height: 52px;
			margin: 10px;
		}
	}
</style>
