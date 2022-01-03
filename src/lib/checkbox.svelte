<script lang="ts">
	import Checkmark from '$lib/vectors/checkboxChecked.svg';

	export let checked;
	export let label;
</script>

<div
	{...$$restProps}
	role="checkbox"
	aria-checked={checked}
	class="checkbox"
	class:checked
	on:click
>
	<div class="checkmark box">
		{#if checked} <Checkmark />{/if}
	</div>

	{#if label}<label>{label}</label>{/if}
</div>
