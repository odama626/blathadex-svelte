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
	class="item block"
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