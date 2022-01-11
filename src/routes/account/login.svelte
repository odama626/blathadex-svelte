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

	let verifier;

	async function openNintendoLink() {
		const props = await fetch(`/api/v1/account/nintendo/oauth`).then((r) => r.json());
		verifier = props.verifier;
		window.open(props.url, null, 'popup=yes');
	}
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
		<!-- <section>
			<h3>Link Nintendo Account</h3>
			<p>
				This will allow you to sync up your current game catalog along with your villagers with
				blathadex
			</p>
			<p>
				We aren't able to 100% automate the account linking process so it requires a couple steps
			</p>
			<ol style="text-align: left;">
				<li>Click <button on:click={openNintendoLink}>Login</button></li>
				<li>Login to your account</li>
				<li>
					On link account page find the account you want to link and right click / or long press on
					"select this account" button and click "copy link"
				</li>
				<li>paste the link in the account link field below and click continue</li>
				<li>
					<form action="/api/v1/account/nintendo/oauth" method="post">
						<input type="hidden" name="verifier" value={verifier} />
						<label>
							Account Link
							<input name="account_link" placeholder="account link" />
						</label>
						<button>continue</button>
					</form>
				</li>
			</ol>
		</section> -->
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
