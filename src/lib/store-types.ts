import { browser } from '$app/env';
import { writable } from 'svelte/store';
import chainMerge from './chainMerge';

export const syncState = writable('loading');
const FETCH_CONFIG: Partial<RequestInit> = {
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'same-origin'
};

export function writableBackend(
	initial,
	{ merge = (a, b) => ({ ...a, ...b }), url, internalStore = writable, loadingDelay = 250 } = {}
) {
	let init = initial;
	try {
		if (browser) init = JSON.parse(localStorage.getItem(url)) || initial;
	} catch (e) {
		console.log(e);
		init = initial;
	}

	const store = internalStore(init);
	store.subscribe((update) => {
		try {
			if (browser) localStorage.setItem(url, JSON.stringify(update));
		} catch (e) {
			console.error('failed to save store update for key', url);
		}
	});

	async function attach() {
		const timeout = setTimeout(() => {
			syncState.set('loading');
		}, loadingDelay);
		await fetch(url, FETCH_CONFIG)
			.then((r) => {
				if (!r.ok) throw r;
				return r.json();
			})
			.then((data) => {
				clearTimeout(timeout);
				syncState.set('ok');
				store.update((cur) => merge(cur, data));
			})
			.catch(() => {
				clearTimeout(timeout);
				syncState.set('error');
			});

		store.subscribe((value) => {
			const timeout = setTimeout(() => {
				syncState.set('loading');
			}, loadingDelay);

			fetch(url, {
				method: 'post',
				...FETCH_CONFIG,
				body: JSON.stringify(value)
			})
				.then((r) => {
					clearTimeout(timeout);
					if (!r.ok) throw r;
					syncState.set('ok');
				})
				.catch(() => syncState.set('error'));
		});
	}

	if (browser) {
		attach();
	}

	return store;
}

export function writableLocalStorage(initial, { key, internalStore = writable } = {}) {
	let init = initial;
	try {
		init = JSON.parse(localStorage.getItem(key)) || initial;
	} catch (e) {
		init = initial;
	}
	const store = internalStore(init);
	store.subscribe((update) => {
		try {
			localStorage.setItem(key, JSON.stringify(update));
		} catch (e) {
			console.error('failed to save store update for key', key);
		}
	});

	return store;
}

export function writableChainStore(initial, { internalStore = writable } = {}) {
	const store = internalStore(initial);

	return {
		subscribe: store.subscribe,
		set(value, path = '') {
			return store.update((old) => chainMerge(old, value, path));
		}
	};
}
