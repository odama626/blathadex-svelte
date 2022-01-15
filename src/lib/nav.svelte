<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { NAV_LINKS } from './routes';
	import { colorScheme } from './store';
	import DarkModeIcon from '$lib/vectors/dark-mode.svg';
	import LightModeIcon from '$lib/vectors/light-mode.svg';
	export let isOpen = false;
</script>

{#if isOpen}
	<div class="shade" transition:fade|local on:click={() => (isOpen = false)} />
	<nav transition:fly|local={{ x: -500 }} class="nav side">
		{#each NAV_LINKS as link (link.name)}
			<a href={link.href} class="item" class:active={$page.url.path === link.href}>{link.name}</a>
		{/each}
		<section role="radiogroup" class="switcher wide">
			<div
				role="radio"
				class:active={$colorScheme === 'light'}
				on:click={() => colorScheme.set('light')}
			>
				<LightModeIcon /> light
			</div>
			<div
				role="radio"
				class:active={$colorScheme === 'dark'}
				on:click={() => colorScheme.set('dark')}
			>
				<DarkModeIcon /> dark
			</div>
		</section>
	</nav>
{/if}


<style lang='scss'>
	.nav.side {
		--icon-stroke-color: var(--primary);
		--icon-fill-color: var(--primary);
	}

	:global([data-theme="dark"]) .nav.side {
		--icon-fill-color: transparent;
	}
</style>