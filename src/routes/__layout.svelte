<script context="module" lang="ts">
	import { browser } from '$app/env';
	import Preview from '$lib/image/preview.svelte';
	import { replaceStateWithQuery } from '$lib/utils';
	import googleAnalytics from '@analytics/google-analytics';
	import Analytics from 'analytics';
	import { onMount } from 'svelte';
	

	export async function load(props) {
		const { session, url, fetch, stuff } = props;

		if (browser) {
			const analytics = Analytics({
				app: 'blathadex',
				plugins: [
					googleAnalytics({
						trackingId: import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID
					})
				]
			});
			analytics.page();
		}

		if (browser && session.account) {
			if (url.searchParams.get('magic')) {
				replaceStateWithQuery({ magic: null });
			}
		}

		return {};
	}
</script>

<script lang="ts">
	import '../global.scss';
	import '../layout.css';
	onMount(() => {
		const analytics = Analytics({
			app: 'blathadex',
			plugins: [
				googleAnalytics({
					trackingId: import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID
				})
			]
		});
		analytics.page();
	});
</script>

<slot />
<Preview />
