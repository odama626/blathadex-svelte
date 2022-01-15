<script context="module" lang="ts">
	export async function load({ url, params, fetch, session, stuff }) {
		return {
			props: {
				account: session?.account,
				sent: url.searchParams.get('sent') === 'true',
				email: url.searchParams.get('email')
			}
		};
	}
</script>

<script>
	import Header from '$lib/header.svelte';
	import MagicLinkHero from '$lib/vectors/magic-link-hero.svg';
	import { syncState } from '$lib/store-types';

	export let account;
	export let sent;
	export let email;

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
			<div class="hero-background">
				<MagicLinkHero />
			</div>
			<div>
				{#if $syncState === 'ok' && account}
					<h3>Welcome back {account.email}!</h3>
					<p>You're logged in and your data should be syncing</p>
					<a href="/"><button>Back to Home</button></a>
				{:else if sent}
					<h3>Sent! Check your email for a login link</h3>
					<p>
						We just sent an email to you at <a>{email}</a> it contains a link that will sign you in!
					</p>
					<p>
						<a href="/"><button>Back to Home</button></a>
					</p>
					<p>
						<a href="/account/login">Try a different email ></a>
					</p>
				{:else}
					<p>Get a magic link sent to your email that will sign you in instantly</p>
					<form action="/api/v1/account/email-link">
						<label style="text-align: left; width: 100%;">
							<div>Email</div>
							<input bind:value={email} name="email" style="width: 100%;" />
						</label>
						<br />
						<br />
						<button>Email me a login link!</button>
					</form>
					<p>
						We won't use your email for newsletters or anything else, its just to help us to know
						who's data to give you when you come back
					</p>
					<p>
						If you're only using this device, your data is already saved locally as long as you
						don't clear your browser history.
					</p>
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
		--eye: var(--background);
	}

	.hero-background {
		background-color: var(--header-background);
		margin: -16px;
		padding: 16px;
		margin-bottom: 16px;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}

	:global([data-theme='dark']) .container {
		--eye-background: transparent;
		--eye: green;
	}
</style>
