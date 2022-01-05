<script lang="ts">
	import Image from 'svelte-image';
	import { getItemImage,sanitizeName } from './utils';
	import Checkmark from './vectors/checkmark.svg';

	export let item;
	export let collected;


	let image = getItemImage(item);
</script>

<a href="/items/{sanitizeName(item.name)}" class="item">
	<div class="stack">
		<Image src={image} />
		{#if collected}<Checkmark class="badge bottom left" />{/if}
	</div>
</a>

<style>
	.item {
		display: block;
		width: 100px;
		height: 100px;
	}
</style>
