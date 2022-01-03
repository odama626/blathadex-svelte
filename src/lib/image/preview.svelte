<script lang="ts">
	import { preview, receive, send } from './image-store';

	let lastSrc;
	preview.subscribe((preview) => {
		if (preview) {
			lastSrc = preview.src;
			// lockScroll();
		} else {
			// unlockScroll();
		}
	});
</script>

{#if $preview?.target}
	<div class="shade" on:click={() => preview.set(null)}>
		<img
			alt={lastSrc}
			in:receive={{ key: lastSrc }}
			out:send={{ key: lastSrc }}
			class="large-image"
			style="--width: {$preview?.size?.width}px; --height: {$preview?.size?.height}px"
			src={$preview.src}
		/>
	</div>
{/if}

<style>
	.shade {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
    backdrop-filter: blur(5px);
    z-index: 5;
	}
  .large-image {
		z-index: 100;
		opacity: 1 !important;
		width: var(--width);
		height: var(--height);
	}
</style>
