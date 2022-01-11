<script lang="ts">
	import Checkmark from '$lib/vectors/checkmark.svg';
	import { slide } from 'svelte/transition';

	import longPress from './long-press';

	export let id;
	export let href = undefined;
	export let image;
	export let label;
	export let active = false;
	export let acquired = false;
	export let selected = false;
	export let loading = false;
</script>

<a
	transition:slide|local
	class="item block"
	{href}
	sveltekit:prefetch
	use:longPress
	on:long-press
	on:click
	data-selected={selected}
	class:active
	class:loading
	data-id={id}
	{...$$restProps}
>
	<slot name='before' />
	<div class="stack">
		<img src={image} alt={label} title={label} />
		{#if acquired}<Checkmark class="badge bottom left" />{/if}
		<slot name="stack" />
	</div>
	<slot name='after' />
</a>
