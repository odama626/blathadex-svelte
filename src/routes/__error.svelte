<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status, url }) {
		return {
			props: {
				title: `${status}: ${error.message}`,
				stack: error.stack,
				dev: import.meta.env.DEV
			}
		};
	}
</script>

<script>
	import Header from '$lib/header.svelte';
	import Icon from '$lib/vectors/Icon404.svg';

	export let title;
	export let stack;
	export let dev;
</script>

<Header />
{#if dev}
	<pre>{stack}</pre>
{/if}
<div class="container">
	<main>
		<section>
			<h2>{title}</h2>
			<p style="text-align: center;">HOW DID WE GET HERE!?!</p>
			<Icon />
			<p />
			<a href="/"><button>Back to Safety!</button></a>
		</section>
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
