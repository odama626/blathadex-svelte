<script>
	import BottomNav from '$lib/bottom-nav.svelte';
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
</script>

<Header>
	<svelte:fragment slot="actions">
		<Search desktop />
	</svelte:fragment>
</Header>
<div class="container">
	<main>
		<slot />
	</main>
</div>
<BottomNav />

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
