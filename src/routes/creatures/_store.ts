import { writableBackend, writableLocalStorage } from "$lib/store-types";

export const selected = writableLocalStorage({}, { key: 'creatures-selected' });
export const acquired = writableBackend({}, { url: '/api/v1/account/save?key=caught&type=set' });
