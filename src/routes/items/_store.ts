import { writableBackend, writableLocalStorage } from '$lib/store-types';

export const selected = writableLocalStorage({}, { key: 'items-selected' });
export const acquired = writableBackend({}, { url: '/api/v1/account/save?key=collected&type=set' });
