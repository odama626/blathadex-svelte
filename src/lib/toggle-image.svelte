<script lang="ts">
	import X from '$lib/vectors/x.svg';

	export let checked = false;
	export let label = '';
	export let showX = false;
	export let svg;
</script>

<div role="checkbox" aria-checked={checked} tabindex="0" class="toggle image" on:click class:checked>
	{#if label}<label>{label}</label>{/if}
	{#if svg}<svelte:component this={svg} />{/if}
	{#if !checked && showX}<X style="position: absolute;" />{/if}
</div>
