<script>
	import Header from '$lib/header.svelte';
	import Search from '$lib/search.svelte';
	import Image from '$lib/image/index.svelte';
</script>

<Header>
	<Search />
</Header>
<div class="container">
	<main>
		<section>
			<h2>About Blathadex</h2>
			<p>
				Blathadex is a field guide to island life created for people serious about "catchin them
				critters". Through the use of the tool users can mark critters as caught and find more
				information about critters that are available. In the details section of each creature the
				user can find information about where and when is the optimal time to catch the criter.
			</p>
		</section>
		<section>
			<h2>About Us</h2>
			<p>
				We have enjoyed the game so much that we decided to pair up and take advantage of quarantine
				quality time to produce Blathadex. As a developer and designer we hope this will be the
				first of many apps we will build to share with the world.
			</p>
			<Image src='/aboutImage.png' />
		</section>
		<section>
			<h2>Feedback</h2>
			<p>
				We are alway looking for ways to improve, please direct any feedback to our twitter account
				@
			</p>
			<p />
			<p>
				PS: It isn’t Comic Sans it’s Comic Nue which is entirely different.{' '}
				<span role="img" aria-label="wink"> 😉 </span>
			</p>
			<p />
			<p />
			<p>
				If you want to help out and contribute the app is hosted on github at{' '}
				<a target="__blank" href="https://github.com/odama626/blathadex">odama626/blathadex</a>
			</p>
		</section>
	</main>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		max-width: 966px;
	}
</style>
