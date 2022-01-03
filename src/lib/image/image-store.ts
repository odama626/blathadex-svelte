import { writable } from 'svelte/store';
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export const preview = writable();

export const [send, receive] = crossfade({
  duration: d => Math.sqrt(d * 75),

  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 600,
      easing: quintOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});