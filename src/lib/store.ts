import { writableBackend, writableChainStore, writableLocalStorage } from './store-types';

export const colorScheme = writableLocalStorage('light', { key: 'color-scheme' });

export const grownFlowers = writableBackend(
	{},
	{ url: '/api/v1/account/save?key=flowers&type=set' }
);

export const helpBanners = writableChainStore(
	{},
	{ internalStore: (init) => writableLocalStorage(init, { key: 'help-banners' }) }
);

export const store = writableChainStore(
	{
		filter: {
			type: {
				bug: true,
				fish: true,
				sea: true
			},
			caught: true
		},
		hemisphere: 'north',
		sort: 'caught',
		groupBy: 'day'
	},
	{
		internalStore: (init) =>
			writableBackend(init, { url: '/api/v1/account/save?key=config&type=object' })
	}
);
