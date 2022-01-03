<script lang="ts">
	import Hamburger from '$lib/vectors/hamburger.svg';
	import Logo from '$lib/vectors/logo.svg';
	import Nav from '$lib/nav.svelte';
	import { syncState } from './store';
	import SyncOk from '$lib/vectors/sync-ok.svg';
	import SyncError from '$lib/vectors/sync-error.svg';
	import SyncLoading from '$lib/vectors/sync-progress.svg';

	let isNavOpen = false;
</script>

<header>
	<div>
		<div class="left">
			<div class="action" on:click={() => (isNavOpen = !isNavOpen)}>
				<Hamburger class="icon" />
			</div>
			<h1 style="margin: 0">
				<a href="/" class="action" style="color: white; text-decoration: none;"><Logo /></a>
			</h1>
		</div>
		<div class="actions">
			<a href="/account/login" class="action">
				{#if $syncState === 'loading'}
					<SyncLoading />
				{:else if $syncState === 'ok'}
					<SyncOk />
				{:else}
					<SyncError />
				{/if}
			</a>
			<slot name="actions" />
		</div>
	</div>
</header>
<Nav bind:isOpen={isNavOpen} />

<style lang="scss">
	header {
		margin-bottom: 1.45rem;
	}
	.action {
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.actions {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.left {
		display: flex;
		align-items: center;
		justify-content: center;

		:global(.icon) {
			color: white;
			margin-right: 20px;
			cursor: pointer;
		}
	}
</style>
