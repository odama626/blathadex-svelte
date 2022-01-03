<script lang="ts">
	import Checkmark from '$lib/vectors/checkmark.svg';
	import WarningIcon from '$lib/vectors/warningIcon.svg';
	import Image from 'svelte-image';
	import { slide } from 'svelte/transition';
	import longPress from './long-press';
	import { getCreatureId, sanitizeName } from './utils';

	export let creature;
	export let caught = false;
	export let leaving = false;
	export let loading = false;
	export let selected = false;
</script>

<a
	transition:slide|local
	class="critter block"
	class:caught
	class:leaving
	class:loading
	href="/creatures/{sanitizeName(creature.name)}"
	use:longPress
	on:long-press
	on:click
	sveltekit:prefetch
	data-num={creature.num}
	data-selected={selected}
	data-caught={caught}
	data-id={getCreatureId(creature)}
	{...$$restProps}
>
	<div class="stack">
		<img src={creature.iconImage} />
		{#if caught}<Checkmark class="badge bottom left" />{/if}
		{#if leaving}<WarningIcon class="badge top right overhang" />{/if}
	</div>
</a>

<style lang="scss">
	.critter.block {
		width: 100px;
		height: 100px;
		:global(img.blur) {
			filter: none;
		}
	}

	.critter.block[data-selected='true'] {
		background-color: var(--accent-background);
		animation-delay: 0;
		animation-duration: 0.33s;
	}

	.critter.block[data-selected='true']:nth-child(2n) {
		animation-name: keyframes1;
		animation-iteration-count: infinite;
		transform-origin: 50% 10%;
	}

	.critter.block[data-selected='true']:nth-child(2n-1) {
		animation-name: keyframes2;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		transform-origin: 30% 5%;
	}

	@keyframes keyframes1 {
		0% {
			transform: rotate(-1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(1.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes keyframes2 {
		0% {
			transform: rotate(1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-1.5deg);
			animation-timing-function: ease-out;
		}
	}
</style>
