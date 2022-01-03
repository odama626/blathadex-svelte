<script lang="ts">
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';

	import creaturesIcon from '$lib/vectors/sections/creatures.svelte';
	import flowersIcon from '$lib/vectors/sections/flowers.svelte';
	import gyroidsIcon from '$lib/vectors/sections/gyroids.svelte';
	import constructionIcon from '$lib/vectors/sections/construction.svelte';
	import recipesIcon from '$lib/vectors/sections/recipes.svelte';
	import achievementsIcon from '$lib/vectors/sections/achievements.svelte';
	import villagersIcon from '$lib/vectors/sections/villagers.svelte';
	import reactionsIcon from '$lib/vectors/sections/reactions.svelte';
	import eventsIcon from '$lib/vectors/sections/events.svelte';
	import itemsIcon from '$lib/vectors/sections/items.svelte';

	// TODO: add recent searches as options to empty search state
	// TODO: add paging for items

	const items = [
		{ name: 'Creatures', link: '/creatures', icon: creaturesIcon },
		// { name: 'Flowers', link: '/flowers', icon: flowersIcon },
		// { name: 'Gyroids', link: '/gyroids', icon: gyroidsIcon },
		// { name: 'Construction', link: '/construction', icon: constructionIcon },
		// { name: 'Recipes', link: '/recipes', icon: recipesIcon },
		// { name: 'Achievements', link: '/achievements', icon: achievementsIcon },
		// { name: 'Villagers', link: '/villagers', icon: villagersIcon },
		// { name: 'Reactions', link: '/reactions', icon: reactionsIcon },
		// { name: 'Events', link: '/events', icon: eventsIcon },
		{ name: 'Items', link: '/items', icon: itemsIcon }
	];
</script>

<Header>
	<div slot="actions">
		<Search />
	</div>
</Header>
<div class="container">
	<main>
		<section>
			<h3 style="text-align: center;">Welcome to Blathadex</h3>
			<div class="grid">
				{#each items as item}
					<a href={item.link} class="item">
						<label>{item.name}</label>
						<svelte:component this={item.icon} />
					</a>
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

	a.item {
		display: flex;
		color: inherit;
		flex-direction: column;
		align-items: center;
		text-decoration: none;

		:global(svg .icon) {
			transform-box: fill-box;
		}

		:global(svg:hover .icon),
		:global(svg:active .icon) {
			transform-origin: center;
			transform: rotate(2deg);
		}
	}

	section {
		text-align: left;

		a {
			display: block;
		}
	}
</style>
