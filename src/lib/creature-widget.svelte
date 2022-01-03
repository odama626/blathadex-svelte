<script>
	import ToggleImage from './toggle-image.svelte';
	import bells from '$lib/vectors/bagOfBells.svg';
	import bug from '$lib/vectors/bug.svg';
	import seaCreatures from '$lib/vectors/sea.svg';
	import catchesCheck from '$lib/vectors/catchesCheck.svg';
	import fish from '$lib/vectors/fish.svg';
	import NorthernHemisphere from '$lib/vectors/northernHemisphere.svg';
	import order from '$lib/vectors/order.svg';
	import SouthernHemisphere from '$lib/vectors/southernHemisphere.svg';
	import { store } from './store';
</script>

<div class="bottom nav tray">
	<div class="title">Select to show or hide...</div>
	<div class="section">
    <ToggleImage
    svg={fish}
    label="Fish"
    checked={$store.filter.type.fish}
    on:click={() => store.set((checked) => !checked, 'filter.type.fish')}
		/>
		<ToggleImage
    svg={bug}
    label="Bugs"
    checked={$store.filter.type.bug}
    on:click={() => store.set((checked) => !checked, 'filter.type.bug')}
		/>
    <ToggleImage
    svg={seaCreatures}
    label="Sea Creatures"
    checked={$store.filter.type.sea}
    on:click={() => store.set((checked) => !checked, 'filter.type.sea')}
    />
    <ToggleImage
      svg={catchesCheck}
      label="My Catches"
      checked={$store.filter.caught}
      on:click={() => store.set((checked) => !checked, 'filter.caught')}
    />
	</div>
</div>
<div class="bottom nav tray">
	<div class="title">Sort by...</div>
	<div class="section" style='justify-content: center;'>
		<ToggleImage
			on:click={() => store.set('sell', 'sort')}
			svg={bells}
			label="Bells"
			checked={$store.sort === 'sell'}
		/>
		<ToggleImage
			on:click={() => store.set('caught', 'sort')}
			svg={catchesCheck}
			label="My Catches"
			checked={$store.sort === 'caught'}
		/>
		<ToggleImage
			on:click={() => store.set('num', 'sort')}
			svg={order}
			label="Order"
			checked={$store.sort === 'num'}
		/>
	</div>
</div>
<div class="bottom nav tray">
	<div class="title">Select your Hemisphere</div>
	<div class="section" style='justify-content: center;'>
		<div class="switcher big" role="radiogroup">
			<div
				role="radio"
				aria-checked={$store.hemisphere === 'north'}
				class:active={$store.hemisphere === 'north'}
				on:click={() => store.set('north', 'hemisphere')}
			>
				<NorthernHemisphere /> north
			</div>
			<div
				role="radio"
				aria-checked={$store.hemisphere === 'south'}
				class:active={$store.hemisphere === 'south'}
				on:click={() => store.set('south', 'hemisphere')}
			>
				<SouthernHemisphere /> south
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.bottom.nav.tray {
		transform: translateX(var(--x));
		transition: transform 250ms ease-out;
		background-color: var(--section-background);

		flex-shrink: 0;
		/* width: 100vw; */
	}
</style>
