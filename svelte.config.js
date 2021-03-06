import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import image from 'svelte-image';
import svg from '@poppanator/sveltekit-svg';
import sequential from 'svelte-sequential-preprocessor'
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sequential([preprocess(), image()]),

	kit: {
		adapter: adapter(),

		vite: {
			plugins: [svg()],
			resolve: {
				alias: {
					$routes: resolve('./src/routes')
				}
			}
		}
	}
};

export default config;
