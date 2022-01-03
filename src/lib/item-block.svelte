<script lang="ts">
	import { getVariantImage, sanitizeName } from './utils';
	import Image from 'svelte-image';

	export let item;

	let variant = item?.variants?.[0];

	let image = getVariantImage(variant);
</script>

<a href="/items/{sanitizeName(item.name)}" class="item">
	<div class="stack">
		<Image src={image} />
	</div>
</a>

<style>
	.item {
		display: block;
		width: 100px;
		height: 100px;
	}
</style>
