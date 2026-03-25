# Vitesse Lite

Lean Vue starter built on top of Vite+.

## Stack

- Vue 3
- Vite+
- Vue Router 5 file-based routing
- Pinia
- Pinia Colada
- Tailwind CSS 4

## What this template keeps

- A minimal module-based app setup in `src/modules`
- File-based routes in `src/pages`
- One route-driven async-data example at `src/pages/posts/[id].vue`
- A small mock API layer that can be replaced by real API calls later

## Example: Pinia Colada with Vue Router

The template includes a single example route at `/posts/[id]`.

It integrates Pinia Colada with Vue Router by deriving the query cache key from the current route param:

```ts
const route = useRoute();
const postId = computed(() => route.params.id);

const { data: post, isPending } = usePostQuery(postId);
```

Inside `usePostQuery()`, the query key is tied to the route param:

```ts
useQuery({
  key: () => ["posts", postId.value],
  query: () => getPostById(postId.value),
});
```

That means navigating from `/posts/1` to `/posts/2` automatically switches the cache entry and triggers the right fetch.

## Project structure

```txt
src/
  api/          Minimal API wrappers
  composables/  Reusable Vue logic
  data/         Local mock data used by the template
  modules/      App-level plugin setup
  pages/        File-based routes
```

## Commands

```bash
vp install
vp dev
vp check
vp test
vp build
```

## Replace the mock API

The example uses local data in `src/data/posts.ts`.

To connect it to a real backend:

1. Replace the implementation in `src/api/posts.ts`
2. Keep `usePostQuery()` unchanged
3. Keep the route component focused on route params and rendering

## Start from this template

```bash
npx degit antfu-collective/vitesse-lite my-app
cd my-app
vp install
vp dev
```

Then edit `src/pages/index.vue` and `src/pages/posts/[id].vue` to fit your project.
