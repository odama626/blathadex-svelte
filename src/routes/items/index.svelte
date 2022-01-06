<script lang="ts">
	import items from '$lib/data/items.json';
	import ItemBlock from '$lib/item-block.svelte';
	import { acquired } from './_store';
	import { sanitizeName } from '$lib/utils';
	import VirtualList from '@sveltejs/svelte-virtual-list';
</script>

<section>
	<h3>Items</h3>
	<div class="container">
		<VirtualList {items} let:item>
			<a style="text-decoration: none; color: inherit;" href="/items/{sanitizeName(item.name)}">
				<div class="item">
					<ItemBlock {item} collected={$acquired[item.name.toLowerCase()]} />
					{item.name}
				</div>
			</a>
		</VirtualList>
	</div>
</section>

<style lang="scss">
	.container {
		height: 400px;
		height: calc(100vh - 126px - 4.28316rem);
	}

	.item {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1rem;
		color: inherit;
	}
</style>
