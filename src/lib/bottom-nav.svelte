<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher,onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { store } from './store';

	const dispatch = createEventDispatcher();

	export const FAB_BUTTON = {
		BACK: 'M33 26.672V21.8738C32.9994 21.5033 32.8891 21.1412 32.6831 20.8332C32.4771 20.5253 32.1845 20.2852 31.8422 20.1432C31.4999 20.0012 31.1233 19.9638 30.7598 20.0355C30.3962 20.1073 30.0621 20.285 29.7994 20.5463L18 32.1863L29.7994 43.8245C29.9731 43.9992 30.1797 44.1378 30.4072 44.2325C30.6347 44.3271 30.8786 44.3758 31.125 44.3758C31.3714 44.3758 31.6153 44.3271 31.8428 44.2325C32.0703 44.1378 32.2769 43.9992 32.4506 43.8245C32.6248 43.6505 32.763 43.4438 32.8573 43.2163C32.9516 42.9889 33 42.7451 33 42.4988V37.832C38.1562 37.9595 43.7906 38.8932 48 45.3113V43.4363C48 34.7495 41.4375 27.6057 33 26.672',
		SEARCH:
			'M39.7083 36.8333H38.1942L37.6575 36.3158C39.6008 34.0619 40.6688 31.1843 40.6667 28.2083C40.6667 25.7443 39.936 23.3356 38.5671 21.2869C37.1981 19.2381 35.2524 17.6413 32.9759 16.6983C30.6995 15.7554 28.1945 15.5087 25.7778 15.9894C23.3612 16.4701 21.1413 17.6566 19.399 19.399C17.6566 21.1413 16.4701 23.3612 15.9894 25.7778C15.5087 28.1945 15.7554 30.6995 16.6983 32.9759C17.6413 35.2524 19.2381 37.1981 21.2869 38.5671C23.3356 39.936 25.7443 40.6667 28.2083 40.6667C31.2942 40.6667 34.1308 39.5358 36.3158 37.6575L36.8333 38.1942V39.7083L46.4167 49.2725L49.2725 46.4167L39.7083 36.8333ZM28.2083 36.8333C23.4358 36.8333 19.5833 32.9808 19.5833 28.2083C19.5833 23.4358 23.4358 19.5833 28.2083 19.5833C32.9808 19.5833 36.8333 23.4358 36.8333 28.2083C36.8333 32.9808 32.9808 36.8333 28.2083 36.8333Z'
	};

	type FabPosition = 'right' | 'left' | 'center';

	export let fabPosition: FabPosition = 'right';
	export let padding = 20;
	export let cutoutWidth = 7;
	export let fabRadius = 33;
	export let overhangActions = false;
	export let fabIconPath = FAB_BUTTON.SEARCH;
	export let keepOpen = false;

	let width = browser ? visualViewport.width : 1000;
	let fabXPosition = 0;
	let drawerXPosition = 0;
	let collapsed;

	store.subscribe((s) => {
		if (s.isSearching && !collapsed) collapsed = true;
	});

	function updatePositions() {
		width = browser ? visualViewport.width : 1000;
		if (fabPosition === 'right') {
			fabXPosition = width - padding - fabRadius - cutoutWidth;
			drawerXPosition = padding;
		} else if (fabPosition === 'left') {
			fabXPosition = padding + fabRadius + cutoutWidth;
			drawerXPosition = (padding + fabRadius + cutoutWidth) * 2;
		} else {
			fabXPosition = width / 2;
			drawerXPosition = 0;
		}
	}

	onMount(() => {
		let delta = 0;
		let lastPos = window.scrollY;

		function onScroll() {
			let scrollY = window.scrollY;
			delta = scrollY - lastPos;
			lastPos = scrollY;
			const shouldCollapse = keepOpen ? false : delta > 0;
			if (shouldCollapse && !collapsed) {
				dispatch('collapsed');
			}
			collapsed = shouldCollapse;
		}

		window.addEventListener('scroll', onScroll, false);
		window.addEventListener('resize', updatePositions);

		return () => {
			window.removeEventListener('scroll', onScroll, false);
			window.removeEventListener('resize', updatePositions);
		};
	});

	$: {
		if (browser) {
			visualViewport.width, fabPosition, cutoutWidth, updatePositions();
		}
	}
	updatePositions();
</script>

<nav transition:slide|local class="bottom" data-mobile>
	<svg
		style="display: block"
		data-mobile
		{width}
		height="112"
		viewBox="0 0 {width} 112"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="none"
	>
		<defs>
			<mask id="fab-slot">
				<rect width="100%" height="100%" fill="white" y="10" />
				<circle class:collapsed r="40" cx={fabXPosition} cy="47" fill="black" />
			</mask>
			<filter
				id="fabshadow"
				x="0"
				y="0"
				width="74"
				height="74"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
			</filter>
		</defs>
		<g class="bar" class:collapsed>
			<rect {width} y="47" height="80" fill="var(--header-background)" mask="url(#fab-slot)" />
			<foreignObject
				style="overflow: visible;"
				x={drawerXPosition}
				y={overhangActions ? 20 : 47}
				width={width - (padding + cutoutWidth + fabRadius) * 2 - padding}
				height="80"
			>
				<div class="actions">
					<slot name="actions" />
				</div>
			</foreignObject>
		</g>
		<g transform="translate({fabXPosition - fabRadius} 14)">
			<g
				class="fab inset"
				on:click={(e) => {
					if ($store.isSearching) {
						store.set(false, 'isSearching');
					} else {
						const event = new Event('open-search', { bubbles: true });
						e.currentTarget.dispatchEvent(event);
						collapsed = true;
					}
				}}
				class:collapsed
				style="--y: {!collapsed ? 0 : 79 - padding - cutoutWidth - fabRadius}px;"
			>
				<circle cx="33" cy="33" r="33" filter="url(#fabshadow)" />
				<path d={$store.isSearching ? FAB_BUTTON.BACK : fabIconPath} fill="currentColor" />
			</g>
		</g>
	</svg>
	<slot name="child" {collapsed} />
</nav>

<style lang="scss">
	.bottom {
		z-index: 100;
	}

	#fab-slot circle {
		transition: r 250ms;
	}

	.bar,
	.fab {
		transition: all 250ms;
	}

	#fab-slot circle.collapsed {
		transform: translateY(-65px);
		r: 0;
	}

	.bar.collapsed {
		transform: translateY(65px);
	}

	.actions {
	}

	.fab {
		transform-origin: center;
		transform: all 100ms;
	}

	.fab.collapsed {
		transform: translateY(var(--y));
	}

	.fab:active {
		transform: scale(0.8) translateY(var(--y));
	}
</style>
