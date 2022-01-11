<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		const creature = encodeURIComponent(params.creature);
		try {
			const payload = await fetch(`/api/v1/creatures/${creature}`).then((r) => r.json());

			return {
				props: { ...payload }
			};
		} catch (e) {
			return {
				status: 500,
				body: e
			};
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { getDayAvailability, getMonthAvailability } from '$lib/availability';
	import BottomNav from '$lib/bottom-nav.svelte';
	import Checkbox from '$lib/checkbox.svelte';
	import Header from '$lib/header.svelte';
	import Image from '$lib/image/index.svelte';
	import Search from '$lib/search.svelte';
	import { store } from '$lib/store';
	import { acquired } from './_store';
	import { getCreatureId, getLocaleTime, MONTH_NAMES, sanitizeName, titleCase } from '$lib/utils';
	import Bells from '$lib/vectors/bagOfBells.svg';
	import LocationIcon from '$lib/vectors/locationIcon.svg';
	import QuoteAfter from '$lib/vectors/quoteAfter.svg';
	import QuoteBefore from '$lib/vectors/quoteBefore.svg';
	import RarityIcon from '$lib/vectors/rarityIcon.svg';
	import { slide } from 'svelte/transition';
	import SelectableBlock from '$lib/selectable-block.svelte';

	export let creature;
	export let similar;
	export let isCaught = $acquired[getCreatureId(creature)];

	$: isCaught = $acquired[getCreatureId(creature)];

	const hoursAvailable = getDayAvailability([creature]);
	let monthsAvailable = getMonthAvailability([creature]);

	if ($store.hemisphere === 'south') {
		monthsAvailable = monthsAvailable.slice(6).concat(monthsAvailable.slice(0, 6));
	}

	let warning = monthsAvailable[new Date().getMonth()].leaving.length;
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={titleCase(creature.name)} />
	<meta property="og:url" content={browser && location.href} />
	<meta property="og:image" content={creature.critterpediaImage} />
	<meta property="og:description" content={creature.description} />
</svelte:head>

<Header>
	<svelte:fragment slot="actions">
		<Search desktop />
	</svelte:fragment>
</Header>
<div class="container">
	<main>
		<article>
			{#if warning}
				<div class="banner warning">This catch is about to get away!</div>
			{/if}
			<section>
				<h1>{titleCase(creature.name)}</h1>
				<div class="image-container">
					<Image src={creature.critterpediaImage} />
				</div>
				<div class="detail grid">
					<Bells />
					<h3 style="margin-bottom: 0;">{creature.sell.toLocaleString()}</h3>
					<Checkbox
						on:click={() =>
							acquired.update((creatures) => {
								const id = getCreatureId(creature);
								creatures[id] = !creatures[id];
								return creatures;
							})}
						style="justify-self: flex-end"
						label="Caught"
						checked={isCaught}
					/>
					<LocationIcon style="color: var(--primary); place-self: center;" />
					<span class="location">{creature.whereHow || creature.sourceSheet}</span>
				</div>
			</section>
			{#if creature.sourceSheet === 'Fish'}
				<section>
					<div class="fish-shadow">
						<h3 style="margin-0">Size {creature.shadow}</h3>
						<img src="/fins/{creature.shadow.replace(/\//g, '-')}.svg" />
					</div>
				</section>
			{/if}
			{#if isCaught && creature.catchPhrase}
				<section class="quote" transition:slide|local>
					<QuoteBefore style="float: left;" />
					<h3 style="margin: 0;"><i>{creature.catchPhrase}</i></h3>
					<QuoteAfter style="float: right;" />
				</section>
			{/if}
			<section>
				{#if creature.spawnRates}
					<div class="detail grid">
						<RarityIcon />
						<h3 style="margin: 0;">{titleCase(creature.spawnRates)}</h3>
					</div>
				{/if}
				<p>{creature.description}</p>
			</section>
			<section>
				<h3 class="availability-header">Availability</h3>
				<div class="date container">
					<div class="date range hour">
						<div class="flex-container">
							{#each hoursAvailable as hour, i}
								<div
									data-content={getLocaleTime(i)}
									class="date hour"
									class:first={hour.new.length}
									class:last={hour.leaving.length}
									class:active={hour.available.length}
								>
									<div />
								</div>
							{/each}
						</div>
						<div class="static label">12am</div>
					</div>
				</div>
			</section>
			<section>
				<h3 class="availability-header">Seasonality ({$store.hemisphere})</h3>
				<div class="date container">
					<div class="date range month">
						{#each monthsAvailable as month, i}
							<div
								data-content={i}
								class="date month"
								class:active={month.available.length}
								class:last={month.leaving.length}
								class:first={month.new.lenght}
							>
								{MONTH_NAMES[i]}
							</div>
						{/each}
					</div>
				</div>
			</section>
			<section>
				<h3>Similar Creatures</h3>
				<div class="grid">
					{#each similar as creature (creature.name)}
						<SelectableBlock
							href="/creatures/{sanitizeName(creature.name)}"
							label={creature.name}
							id={creature.name}
							image={creature.iconImage}
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

	.location {
		color: var(--calendar-accent);
		grid-column: 2 / 4;
		text-align: left;
	}

	.availability-header {
		margin-top: 16px;
		text-align: left;
	}

	.fish-shadow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.image-container {
		width: 100%;
		max-height: 300px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;

		:global(div) {
			max-height: 300px;
		}

		:global(source) {
			height: 100%;
			width: 100%;
			max-height: 300px;
			object-fit: contain;
		}

		:global(img) {
			height: 100%;
			width: 100%;
			max-height: 300px;
			object-fit: contain;
		}
	}
</style>
