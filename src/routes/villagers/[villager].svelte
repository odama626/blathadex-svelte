<script context="module" lang="ts" type="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		const villagerName = encodeURIComponent(params.villager);

		try {
			const payload = await fetch(`/api/v1/villagers/${villagerName}`).then((r) => r.json());

			return {
				props: { ...payload }
			};
		} catch (error) {
			return {
				status: 500,
				error
			};
		}
	}
</script>

<script lang="ts">
	import Checkbox from '$lib/checkbox.svelte';
	import QuoteAfter from '$lib/vectors/quoteAfter.svg';
	import QuoteBefore from '$lib/vectors/quoteBefore.svg';
	import type { Villagers } from '$lib/data/villagers';
	import Image from '$lib/image/index.svelte';

	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { sanitizeName, titleCase } from '$lib/utils';
	import BirthdayIcon from '$lib/vectors/birthday-icon.svg';
	import { acquired } from './_store';
	import { slide } from 'svelte/transition';
	import BottomNav from '$lib/bottom-nav.svelte';

	export let villager: Villagers;
	export let similarSpecies;
</script>

<Header>
	<svelte:fragment slot="actions">
		<Search desktop />
	</svelte:fragment>
</Header>

<div class="container">
	<main>
		<article>
			<section>
				<h1>{titleCase(villager.name)}</h1>
				<div class="main-image">
					<Image src={villager.photoImage} alt={villager.name} />
				</div>
				<div class="detail grid">
					<BirthdayIcon />
					<span>{villager.birthday}</span>
					<Checkbox
						on:click={() =>
							acquired.update((villagers) => {
								const id = villager.name.toLowerCase();
								villagers[id] = !villagers[id];
								return villagers;
							})}
						checked={$acquired[villager.name.toLowerCase()]}
						style="place-self: end;"
						label="Neighbors"
					/>
					<img src={villager.iconImage} />
					<div class="detail">Species: {villager.species}</div>
					<div class="detail">Gender: {villager.gender}</div>
					<div class="detail">Personality: {villager.personality}</div>
					<div class="detail">Subtype: {villager.subtype}</div>
					<div class="detail">Hobby: {villager.hobby}</div>
					<div class="house">
						<Image src={villager.houseImage} />
					</div>
				</div>
			</section>
			{#if villager.favoriteSaying}
				<section
					style="--bubble-color: {villager.bubbleColor}; --text-color: {villager.nameColor};"
					class="quote"
					transition:slide|local
				>
					<QuoteBefore />
					<h3 style="margin: 0;"><i>{villager.favoriteSaying}</i></h3>
					<QuoteAfter />
				</section>
			{/if}
			<section>
				<h3>Other {villager.species.toLowerCase()} villagers</h3>
				<div class="grid">
					{#each similarSpecies as villager (villager.name)}
						<SelectableBlock
							image={villager.iconImage}
							label={villager.name}
							id={villager.name}
							acquired={$acquired[villager.name.toLowerCase()]}
							href={`/villagers/${sanitizeName(villager.name)}`}
						/>
					{/each}
				</div>
			</section>
		</article>
	</main>
</div>
<BottomNav />

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}

	.house {
		grid-column: 3;
		grid-row: 2 / 7;
		flex-shrink: 1;
		height: 217px;
		display: flex;
		aspect-ratio: 1;
		place-self: start;
	}

	.quote {
		color: var(--text-color);
		background-color: var(--bubble-color);
	}

	.detail {
		place-self: start;
		grid-column: 2;
		text-align: left;
	}

	.main-image {
		border-radius: 50%;
		overflow: hidden;
		height: 256px;
		aspect-ratio: 1;
		margin: auto;
	}
</style>
