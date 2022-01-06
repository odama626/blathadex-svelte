<script context="module" lang="ts">
	export async function load({ url, params, fetch, session, stuff }) {
		return {
			props: { account: session?.account, sent: url.searchParams.get('sent') === 'true' }
		};
	}
</script>

<script>
	import Header from '$lib/header.svelte';
	import { syncState } from '$lib/store-types';

	export let account;
	export let sent;
</script>

<Header />

<div class="container">
	<main>
		<section>
			<h3>Login</h3>
			<p>
				Login / Sign up with a magic link to save your caught creatures, collected items, and other
				selections.
			</p>
			<p>
				We won't use your email for newsletters or anything else, its just to help us know who's
				data to give you when you come back
			</p>
			<p>
				If you're only using this device, your data is already saved locally as long as you don't
				clear your browser history and you don't need to sign up although we still recommend it
			</p>
			<div>
				{#if $syncState === 'ok' && account}
					<h3>Welcome back {account.email}!</h3>
					<p>You're logged in and your data should be syncing</p>
					<a href="/"><button>Take me back</button></a>
				{:else if sent}
					<h3>Sent! Check your email for a login link</h3>
				{:else}
					<form action="/api/v1/account/email-link">
						<label>
							<span>Email</span>
							<input name="email" />
						</label>
						<br />
						<br />
						<button>Email me a login link!</button>
					</form>
				{/if}
			</div>
		</section>
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
