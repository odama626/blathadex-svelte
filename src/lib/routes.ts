import creaturesIcon from '$lib/vectors/sections/creatures.svelte';
import flowersIcon from '$lib/vectors/sections/flowers.svelte';
import gyroidsIcon from '$lib/vectors/sections/gyroids.svelte';
import constructionIcon from '$lib/vectors/sections/construction.svelte';
import recipesIcon from '$lib/vectors/sections/recipes.svelte';
import achievementsIcon from '$lib/vectors/sections/achievements.svelte';
import villagersIcon from '$lib/vectors/sections/villagers.svelte';
import reactionsIcon from '$lib/vectors/sections/reactions.svelte';
import eventsIcon from '$lib/vectors/sections/events.svelte';
import itemsIcon from '$lib/vectors/sections/items.svelte';


export const DASHBOARD_LINKS = [
  { name: 'Creatures', href: '/creatures', icon: creaturesIcon },
  // { name: 'Flowers', href: '/flowers', icon: flowersIcon },
  // { name: 'Gyroids', href: '/gyroids', icon: gyroidsIcon },
  // { name: 'Construction', href: '/construction', icon: constructionIcon },
  // { name: 'Recipes', href: '/recipes', icon: recipesIcon },
  // { name: 'Achievements', href: '/achievements', icon: achievementsIcon },
  { name: 'Villagers', href: '/villagers', icon: villagersIcon },
  // { name: 'Reactions', href: '/reactions', icon: reactionsIcon },
  // { name: 'Events', href: '/events', icon: eventsIcon },
  { name: 'Items', href: '/items', icon: itemsIcon }
];

export const NAV_LINKS = [
  ...DASHBOARD_LINKS,
  { name: 'About', href: '/about' },
  { name: 'Login / Signup', href: '/account/login' } 
]