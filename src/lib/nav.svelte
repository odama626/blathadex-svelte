<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	export let isOpen = false;

	let links = [
		{ label: 'Creatures', url: '/creatures' },
		{ label: 'Items', url: '/items' },
		{ label: 'About', url: '/about' },
		{ label: 'Login / Signup', url: '/account/login' }
	];
</script>

{#if isOpen}
	<div class="shade" transition:fade|local on:click={() => (isOpen = false)} />
	<nav transition:fly|local={{ x: -500 }} class="nav side" class:open>
		{#each links as link (link.label)}
			<a href={link.url} class="item" class:active={$page.url.path === link.url}>{link.label}</a>
		{/each}
	</nav>
{/if}
