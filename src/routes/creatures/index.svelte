<script lang="ts">
	import { browser } from '$app/env';

	import { getDayAvailability, getMonthAvailability, groupByLocation } from '$lib/availability';
	import BottomNav from '$lib/bottom-nav.svelte';
	import CreatureWidget from '$lib/creature-widget.svelte';
	import creatureJson from '$lib/data/creatures.json';
	import Header from '$lib/header.svelte';
	import MigrateFromGatsby from '$lib/migrate-from-gatsby.svelte';
	import Search from '$lib/search.svelte';
	import SelectableBlock from '$lib/selectable-block.svelte';
	import { store } from '$lib/store';
	import {
		filterCreature,
		getCreatureId,
		getLocaleTime,
		getSetFromArray,
		MONTH_NAMES,
		sanitizeName,
		sortCreature
	} from '$lib/utils';
	import DaySvg from '$lib/vectors/day.svg';
	import FilterIcon from '$lib/vectors/filter.svg';
	import MonthSvg from '$lib/vectors/month.svg';
	import SettingsIcon from '$lib/vectors/settings.svg';
	import SortIcon from '$lib/vectors/sort.svg';
	import AllSvg from '$lib/vectors/all.svg';
	import Location from '$lib/vectors/locationIcon.svg';
	import WarningIcon from '$lib/vectors/warningIcon.svg';
	import { fade, slide } from 'svelte/transition';
	import { acquired, selected } from './_store';

	const now = new Date();
	const currentMonth = now.getMonth();
	const currentHour = now.getHours();
	let offsetMonth;
	let months;
	let adjustedMonths;
	let hours;
	let adjustedHours;
	let adjustedLocation = [];
	let locations;
	let isSelecting: string | boolean = !!getSetFromArray($selected).length;
	let creatures = [];
	let loading = true;

	$: {
		offsetMonth = currentMonth;
		if ($store.hemisphere === 'south') offsetMonth -= 6;
		const caughtArray = getSetFromArray($acquired);
		creatures = creatureJson
			.filter(filterCreature($store.filter, caughtArray))
			.sort(sortCreature($store.sort, caughtArray));

		months = getMonthAvailability(creatures);
		adjustedMonths = months.slice(offsetMonth).concat(months.slice(0, offsetMonth));
		hours = getDayAvailability(adjustedMonths[0].available);
		adjustedHours = hours.slice(currentHour).concat(hours.slice(0, currentHour));

		locations = groupByLocation(adjustedHours[0].available);
		if (browser) loading = false;
	}

	let sections = [];
	let navMenu;

	function toggleSelected(node) {
		const id = node.dataset.id;
		const isSelected = node.dataset.selected === 'true';

		selected.update((s) => {
			s[id] = !isSelected;
			return s;
		});

		node.dataset.selected = !isSelected;
		isSelecting = getSetFromArray($selected).length > 0;
	}

	function onMarkCaught() {
		acquired.update((cur) => ({
			...cur,
			...$selected
		}));
		selected.set({});
		isSelecting = false;
	}

	function onCancelSelection() {
		document
			.querySelectorAll('[data-selected="true"]')
			.forEach((node) => (node.dataset.selected = false));
		selected.set({});
		isSelecting = false;
	}

	$: {
		if ($store.groupBy === 'day') {
			sections = adjustedHours.map((hour, i) => {
				hour.header =
					i === 0 ? 'Available now' : `Available at ${getLocaleTime((i + currentHour) % 24)}`;
				return hour;
			});
		} else if ($store.groupBy === 'all') {
			sections = [{ header: 'All', available: creatures }];
		} else if ($store.groupBy === 'live') {
			sections = locations;
		} else {
			sections = adjustedMonths.map((month, i) => {
				month.header =
					i === 0 ? 'Available this month' : `New in ${MONTH_NAMES[(i + currentMonth) % 12]}`;
				return month;
			});
		}
	}

	function toggleMenu(menu) {
		if (menu === navMenu) navMenu = '';
		else navMenu = menu;
	}
</script>

<Header>
	<svelte:fragment slot="actions">
		<Search desktop />
	</svelte:fragment>
</Header>
<nav data-desktop class="bottom">
	<CreatureWidget />
	{#if getSetFromArray($selected).length > 0}
		<header transition:slide|local>
			<button class="error" on:click={onCancelSelection}>Cancel</button>
			<button class="success" on:click={onMarkCaught}>
				Mark {getSetFromArray($selected).length} Caught!
			</button>
		</header>
	{/if}
</nav>
<div class="container">
	<main>
		<MigrateFromGatsby />
		<section role="radiogroup" class="switcher wide">
			<div
				role="radio"
				aria-checked={$store.groupBy === 'all'}
				class:active={$store.groupBy === 'all'}
				on:click={() => store.set('all', 'groupBy')}
			>
				<AllSvg height="28px" /> All
			</div>
			<div
				role="radio"
				aria-checked={$store.groupBy === 'month'}
				class:active={$store.groupBy === 'month'}
				on:click={() => store.set('month', 'groupBy')}
			>
				<MonthSvg /> Month
			</div>
			<div
				role="radio"
				aria-checked={$store.groupBy === 'day'}
				class:active={$store.groupBy === 'day'}
				on:click={() => store.set('day', 'groupBy')}
			>
				<DaySvg /> Day
			</div>
			<div
				role="radio"
				aria-checked={$store.groupBy === 'live'}
				class:active={$store.groupBy === 'live'}
				on:click={() => store.set('live', 'groupBy')}
			>
				<Location /> Live
			</div>
		</section>
		{#each sections as section, i}
			{#if (i === 0 && section.available?.length > 0) || section.items?.length > 0 || section.new?.length > 0}
				<section transition:fade|local>
					<h3>{section.header}</h3>
					<div class="grid">
						{#each (i === 0 ? section.available : section.new) || section.items || [] as creature (getCreatureId(creature))}
							<SelectableBlock
								{loading}
								id={getCreatureId(creature)}
								selected={$selected[getCreatureId(creature)]}
								acquired={$acquired[getCreatureId(creature)]}
								image={creature.iconImage}
								href="/creatures/{sanitizeName(creature.name)}"
								on:long-press={(e) => {
									toggleSelected(e.currentTarget);
									isSelecting = getCreatureId(creature);
								}}
								on:click={(e) => {
									if (!isSelecting) return;
									e.stopPropagation();
									e.preventDefault();
									if (isSelecting !== getCreatureId(creature)) {
										toggleSelected(e.currentTarget);
									}
									isSelecting = !!isSelecting;
								}}
							>
								<svelte:fragment slot="stack">
									{#if i === 0 && section.leaving?.includes(creature.name)}
										<WarningIcon class="badge top right overhang" />
									{/if}
								</svelte:fragment>
							</SelectableBlock>
						{:else}
							<p style="grid-column: 1 / 4">Nothing to see here, adjust the filters</p>
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	</main>
</div>

{#if getSetFromArray($selected).length > 0}
	<nav
		transition:slide|local
		data-mobile
		data-selection
		style="z-index: 19;"
		class="bottom selection"
	>
		<header>
			<button class="error" on:click={onCancelSelection}> Cancel </button>
			<button class="success" on:click={onMarkCaught}>
				Mark {getSetFromArray($selected).length} Caught!
			</button>
		</header>
	</nav>
{:else}
	<BottomNav keepOpen={navMenu} on:collapsed={() => (navMenu = '')}>
		<div class="nav-actions" slot="actions">
			<div class:active={navMenu === 'filter'} on:click={() => toggleMenu('filter')}>
				<FilterIcon />
			</div>
			<div class:active={navMenu === 'sort'} on:click={() => toggleMenu('sort')}><SortIcon /></div>
			<div class:active={navMenu === 'settings'} on:click={() => toggleMenu('settings')}>
				<SettingsIcon />
			</div>
		</div>
		<div slot="child">
			{#if navMenu}
				<div
					transition:slide|local
					class="bottom-nav-tray-container"
					style="--x: {['filter', 'sort', 'settings'].indexOf(navMenu) * -100}%;"
				>
					<CreatureWidget />
				</div>
			{/if}
		</div>
	</BottomNav>
{/if}

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}

	.bottom-nav-tray-container {
		display: flex;
		flex-direction: row;

		> :global(.bottom.nav.tray) {
			width: 100vw;
		}
	}

	.nav-actions {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(5, 1fr);
		align-items: center;
		justify-items: center;
		align-self: flex-start;
		margin-top: 1em;
		.active {
			color: var(--accent-background);
			filter: drop-shadow(0px 0px 6px rgba(20, 20, 20, 0.25));
		}
	}
</style>
