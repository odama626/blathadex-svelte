<script lang="ts">
	import Header from '$lib/header.svelte';
	import { DASHBOARD_LINKS } from '$lib/routes';
	import Search from '$lib/search.svelte';

	// TODO: add recent searches as options to empty search state
	// TODO: get rid of southern / northern in creature json and have active months / active hours at root level
	// TODO: add paging for items
	// TODO: add FAQ to about page
	// TODO: add dismissable hints for different pages, dismissed state should be saved in localstorage
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
				{#each DASHBOARD_LINKS as item}
					<a href={item.href} class="item">
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
