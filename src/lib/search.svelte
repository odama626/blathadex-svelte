<script lang="ts">
	import BackButton from '$lib/vectors/back.svg';
	import CloseIcon from '$lib/vectors/closeButton.svg';
	import SearchIcon from '$lib/vectors/searchButton.svg';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { store } from './store';
	import { getRouteFromSourceSheet, getVariantImage, sanitizeName } from './utils';
	import debounce from 'lodash.debounce';

	export let inline = false;
	export let value = '';
	export let hideResults = false;
	export let desktop = false;
	let input;

	let items = [];

	async function updateResults() {
		if (!value) return;
		const url = new URL(`/api/v1/search`, location.origin);
		url.searchParams.set('q', value);
		const result = await fetch(url.toString()).then((r) => r.json());
		items = result.items;
	}

	const debouncedUpdate = debounce(updateResults, 500)

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

	$: if ($store.isSearching) tick().then(() => input.focus());
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
			<div class="input end" on:click={() => (value = '')}>
				<CloseIcon class="input end" style="cursor: pointer" />
			</div>
			<input bind:this={input} bind:value placeholder="Search" />
		</div>
		{#if !hideResults}
			<div class="results">
				<VirtualList {items} let:item>
					<a
						on:click={() => store.set((s) => false, 'isSearching')}
						class="item"
						style="text-decoration: none;"
						href="/{getRouteFromSourceSheet(item.sourceSheet)}/{sanitizeName(item.name)}"
					>
						<img src={getVariantImage(item?.variants?.[0]) ?? item?.iconImage ?? item?.image} />
						{item.name}
					</a>
				</VirtualList>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.shade {
		backdrop-filter: blur(5px);
		top: 73px;
		width: 100%;
		left: 0;
		bottom: 0;
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
