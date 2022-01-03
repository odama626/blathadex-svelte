<script>
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
</script>

<Header>
	<svelte:fragment slot="actions">
		<Search />
	</svelte:fragment>
</Header>
<div class="container">
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
