<script>
	import Image from 'svelte-image';
	import { base } from '$app/paths';
	import { preview, receive, send } from './image-store';
	export let src;

	let initialSize = { width: 0, height: 0 };
	let container, img;

	function scaleTo(viewport, aspectRatio) {
		let size = {
			width: viewport.width,
			height: viewport.width / aspectRatio
		};

		let xScale = viewport.width / size.width;
		let yScale = viewport.height / size.height;

		let scale = Math.min(yScale, xScale);
		size.width = size.width * scale;
		size.height = size.height * scale;

		return size;
	}

	function toggleImage(e) {
		let img = e.target;
		let aspectRatio = img.naturalWidth / img.naturalHeight;
		const sources = Array.from(container.querySelectorAll('[srcset]')).map(
			(s) => `${s.srcset.split(' ')[0]}`
		);
		if (sources?.[0]) {
			src = sources?.[0];
		}

		const computedStyle = e.currentTarget.getBoundingClientRect();
		const size = scaleTo(visualViewport, aspectRatio);
		initialSize = scaleTo(computedStyle, aspectRatio);

		setTimeout(() => {
			preview.set({ src: sources?.[0] || src, target: e.target, size });
		}, 5);
	}
</script>

<div bind:this={container} class="container" on:click={toggleImage}>
	<Image {...$$restProps} {src} class="image" />
	{#if $preview?.src !== src}
		<div
			style="--width: {initialSize?.width}px; --height: {initialSize?.height}px"
			class="center"
			in:receive={{ key: src }}
			out:send={{ key: src }}
		/>
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		position: relative;
		line-height: 1px;
	}
	.center {
		position: absolute;
		margin: auto;
		width: 40%;
		height: 40%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background-color: red; */
		pointer-events: none;
		width: var(--width);
		height: var(--height);
	}

	:global(.image) {
		object-fit: contain;
		height: 100%;
		z-index: 0;
		transition: all 1s;
	}

	:global(.image:hover) {
		cursor: pointer;
	}

	:global(.image[data-size='scaled']) {
		position: fixed !important;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 5;
	}
</style>
