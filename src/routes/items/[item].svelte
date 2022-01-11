<script context="module" lang="ts" type="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		const itemName = encodeURIComponent(params.item);
		try {
			const payload = await fetch(`/api/v1/items/${itemName}`).then((r) => r.json());

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
	import { browser } from '$app/env';
	import Checkbox from '$lib/checkbox.svelte';
	import Image from '$lib/image/index.svelte';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { getAcquiredLabel, getItemImage, getLargeVariantImage, sanitizeName, titleCase } from '$lib/utils';
	import Bells from '$lib/vectors/bagOfBells.svg';
	import LocationIcon from '$lib/vectors/locationIcon.svg';
	import Pattern from '$lib/vectors/pattern.svg';
	import { acquired } from './_store';
	import Plus from '$lib/vectors/plus.svg';

	export let item;
	export let recipe;
	export let similar;
	export let setItems;
	export let flower;

	$: variant = item?.variants?.[0];
	$: image = getLargeVariantImage(variant);
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={titleCase(item.name)} />
	<meta property="og:url" content={browser && location.href} />
	<meta property="og:image" content={getLargeVariantImage(variant)} />
	<meta
		property="og:description"
		content={item.description || item.sourceNotes || 'An item on blathadex.com'}
	/>
</svelte:head>

<article>
	<section>
		<h1>{titleCase(item.name)}</h1>
		{#if item.set}<h2 class="secondary">{titleCase(item.set)}</h2>{/if}
		<div class="stack">
			<div class="image-container">
				<Image src={image} />
			</div>
			<Pattern style="padding: 0;" />
		</div>
		<div class="detail grid">
			<Bells />
			<h3 style="margin-bottom: 0">{variant.sell?.toLocaleString() || 'not for sale'}</h3>
			<Checkbox
				checked={$acquired[item.name.toLowerCase()]}
				on:click={() => {
					acquired.update((items) => {
						const id = item.name.toLowerCase();
						items[id] = !items[id];
						return items;
					});
				}}
				style="justify-self: flex-end"
				label={getAcquiredLabel(item)}
			/>
			{#if variant.source}
				<LocationIcon style="place-self: center;" />
				{#each variant.source as source}
					<span style="grid-column: 2 / 4">{source}</span>
				{/each}
			{/if}
		</div>
	</section>
	{#if flower?.breed?.length}
		<section>
			<h3>Breed from</h3>
			<div class="grid">
				{#each flower.breed as breed}
					<div class="breed-group">
						{#each breed as flower, i}
							<SelectableBlock
								href={sanitizeName(flower.name)}
								label={flower.name}
								id={flower.name}
								image={flower.image}
								acquired={$acquired[flower.name.toLowerCase()]}
							/>
						{/each}
						<Plus style="position: absolute; margin: auto; left: 0; right: 0; top: 0; bottom: 0;" />
					</div>
				{/each}
			</div>
		</section>
	{/if}
	{#if item.variants.length > 1}
		<section>
			<h3>Variants</h3>
			<div class="grid">
				{#each item.variants as variant (variant.uniqueEntryId)}
					<SelectableBlock
						on:click={() => (image = variant.image)}
						active={image === variant.image}
						id={variant.internalId}
						image={variant.image}
						label={variant.internalId}
					/>
				{/each}
			</div>
		</section>
	{/if}
	{#if recipe?.materials}
		<section>
			<h3 >Recipe</h3>
			<div class="detail grid">
				{#if recipe.source}
				<LocationIcon style="place-self: center;" />
				{#each recipe.source as source}
					<span style="grid-column: 2 / 4">{source}</span>
				{/each}
			{/if}
				<h4 class="ingredients-header">Ingredients</h4>
				{#if recipe?.materials}
					{#each recipe.materialDetails as detail (detail.name)}
						<div class="block primary detail" style="grid-column: 1; place-self: center">
							{detail.qty}
						</div>
						<a href="/items/{sanitizeName(detail.name)}" class="material">
							{titleCase(detail.name)}
							<div class="image">
								<Image src={detail.image} />
							</div>
						</a>
					{/each}
				{/if}
				<!-- {#if recipe?.hasDiy}
					<h3 class="ingredients-header">Total Ingredients</h3>
					{#each recipe.extendedMaterialDetails as detail (detail.name)}
						<div class="block primary detail" style="grid-column: 1; place-self: center">
							{detail.qty}
						</div>
						<a href="/items/{sanitizeName(detail.name)}" class="material">
							{titleCase(detail.name)}
							<div class="image">
								<Image src={detail.image} />
							</div>
						</a>
					{/each}
				{/if} -->
			</div>
			{#if recipe?.additionalRecipes?.length}
				<h3 style="text-align: left;">Required Recipes</h3>
				<div class="grid">
					{#each recipe?.additionalRecipes as recipe (recipe.name)}
						<SelectableBlock
							id={recipe.name}
							label={recipe.name}
							acquired={$acquired[recipe.name.toLowerCase()]}
							href="/items/{sanitizeName(recipe.name)}"
							image={recipe.image}
						/>
					{/each}
				</div>
			{/if}
		</section>
	{/if}
	{#if item.size}
		<section>
			<div class="item-size">
				<div style="text-align: left;">
					<h3 style="margin-bottom: 0;">Dimensions</h3>
					<p>{item.size}</p>
				</div>
				<div class="size-image">
					<img src="/object-sizes/{item.size}.svg" />
				</div>
			</div>
		</section>
	{/if}
	{#if setItems?.length > 0}
		<section>
			<h3>Other {titleCase(item.set)} Items</h3>
			<div class="grid">
				{#each setItems as item (item.name)}
					<SelectableBlock
						href="/items/{sanitizeName(item.name)}"
						label={item.name}
						id={item.name}
						acquired={$acquired[item.name.toLowerCase()]}
						image={getItemImage(item)}
					/>
				{/each}
			</div>
		</section>
	{/if}
	{#if similar.length > 0}
		<section>
			<h3>Similar Items</h3>
			<div class="grid">
				{#each similar as item (item.name)}
					<SelectableBlock
						href="/items/{sanitizeName(item.name)}"
						label={item.name}
						id={item.name}
						acquired={$acquired[item.name.toLowerCase()]}
						image={getItemImage(item)}
					/>
				{/each}
			</div>
		</section>
	{/if}
</article>

<style lang="scss">
	h2.secondary {
		color: var(--secondary);
	}

	.breed-group {
		position: relative;
		display: flex;
		gap: 1rem;
		grid-column: span 2;
	}

	.additional-recipes {
		grid-row-start: 2;
		grid-column: 3;
		place-self: baseline;
		grid-row-end: var(--grid-row-end);
		width: 100%;
		justify-content: start;
	}

	.self-end {
		justify-self: flex-end;
	}

	.size-image {
		/* img { */
		/* height: 95px; */
		/* } */
		/* height: 95px; */
		/* display: flex; */
		/* aspect-ratio: 1; */
		/* height: 100%; */
		/* grid-column: 3; */
		/* grid-row: 2 / 5; */
		/* justify-self: flex-start; */

		width: 100%;
	}

	.detail .image {
		/* height: 100%; */
		height: 35px;
		width: 35px;
	}

	a.material {
		grid-column: 2;
		place-self: center flex-start;
		text-decoration: none;
		color: inherit;
		align-items: center;
		text-align: left;
		display: flex;
	}

	.item-size {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.image-container {
		max-width: 256px;
		max-height: 256px;
		margin: auto;
		:global(img) {
			z-index: 1;
		}
	}

	.detail.grid .ingredients-header {
		grid-column: 1 / 3;
		justify-self: flex-start;
		margin: 0;
		text-align: left;
	}

	.detail.grid .space-header {
		margin: 0;
		justify-self: flex-start;
	}

	.stack {
		padding: 2em;
		overflow: hidden;
		border-radius: var(--border-radius);
		box-shadow: var(--section-shadow);
		margin-bottom: 1rem;
		border: 1px solid var(--accent-outline);
		border-radius: var(--border-radius);
	}
</style>
