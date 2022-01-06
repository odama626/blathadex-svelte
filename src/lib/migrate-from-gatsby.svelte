<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let foundOldDatabase = false;
	let DATABASE_NAME = 'critterDb';
	let status;

	onMount(async () => {
		const databases = await indexedDB.databases();
		if (databases.find((database) => database.name === DATABASE_NAME)) {
			foundOldDatabase = true;
		}
	});
</script>

{#if foundOldDatabase}
	<div transition:slide|local class="banner info">
		We found data from a previous version of Blathadex, would you like to import it?
		<a href="/account/migrate"><button>Yes!</button></a>
		<button on:click={() => (foundOldDatabase = false)}>Dismiss</button>
	</div>
{/if}
