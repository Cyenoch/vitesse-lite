<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { posts } from "@/data/posts";
import { useThemeStore, type ThemePreference } from "@/composables/stores/use-theme-store";

const search = shallowRef("");
const router = useRouter();
const themeStore = useThemeStore();
const { themePreference, resolvedTheme } = storeToRefs(themeStore);

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] satisfies Array<{ label: string; value: ThemePreference }>;

const filteredPosts = computed(() => {
  const normalizedQuery = search.value.trim().toLowerCase();

  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter((post) => {
    return [post.title, post.excerpt].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    );
  });
});

function openExample() {
  void router.push("/posts/1");
}

function updateTheme(nextTheme: ThemePreference) {
  themeStore.setThemePreference(nextTheme);
}
</script>

<template>
  <section class="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
    <Card class="app-panel hero-panel">
      <template #content>
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl space-y-6">
            <p class="eyebrow text-sm font-medium uppercase tracking-[0.3em]">Vitesse Lite</p>
            <div class="space-y-4">
              <h1 class="hero-title text-4xl font-semibold tracking-tight sm:text-6xl">
                A lean Vue starter built on Vite+.
              </h1>
              <p class="body-copy max-w-2xl text-base leading-7 sm:text-lg">
                File-based routing with Vue Router 5, app state with Pinia, and route-driven async
                data with Pinia Colada. PrimeVue is now wired in as the project UI layer.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <Tag rounded value="Vue 3" severity="secondary" />
              <Tag rounded value="Vite+" severity="contrast" />
              <Tag rounded value="Vue Router 5" severity="info" />
              <Tag rounded value="Pinia" severity="success" />
              <Tag rounded value="PrimeVue" severity="warn" />
            </div>
          </div>

          <div class="w-full max-w-sm space-y-5">
            <div class="space-y-3">
              <label id="theme-mode-label" class="muted-copy block text-sm font-medium">
                Theme mode
              </label>
              <SelectButton
                :model-value="themePreference"
                :options="themeOptions"
                aria-labelledby="theme-mode-label"
                class="theme-switch w-full"
                option-label="label"
                option-value="value"
                :allow-empty="false"
                @update:model-value="updateTheme"
              />
              <p class="muted-copy text-sm">
                Managed by Pinia and applied globally. Current theme: {{ resolvedTheme }}.
              </p>
            </div>

            <div class="space-y-3">
              <label class="muted-copy block text-sm font-medium" for="post-search">
                Filter quick links
              </label>
              <InputText
                id="post-search"
                v-model="search"
                class="w-full"
                placeholder="Search posts by title or excerpt"
              />
              <p class="muted-copy text-sm">
                PrimeVue input is active on the homepage and filters the example links below.
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <Card class="app-panel">
        <template #title>Route-aware post details</template>
        <template #subtitle>Included example</template>
        <template #content>
          <p class="body-copy max-w-2xl text-sm leading-6">
            The `/posts/[id]` route reads the current route param, derives a query key from it, and
            fetches the matching entry through Pinia Colada. It is the single async-data example
            kept in the template.
          </p>

          <div class="code-panel mt-6 rounded-2xl p-4 text-sm">
            <p class="code-label">Pattern</p>
            <code class="mt-2 block overflow-x-auto">key: () =&gt; ["posts", route.params.id]</code>
          </div>
        </template>
        <template #footer>
          <Button label="Open example" rounded @click="openExample" />
        </template>
      </Card>

      <Card class="app-panel">
        <template #title>Quick links</template>
        <template #subtitle>{{ filteredPosts.length }} example posts</template>
        <template #content>
          <ul class="space-y-3">
            <li v-for="post in filteredPosts" :key="post.id">
              <RouterLink class="quick-link" :to="`/posts/${post.id}`">
                <span>
                  <span class="quick-link-title block font-medium">{{ post.title }}</span>
                  <span class="quick-link-copy mt-1 block text-sm">{{ post.excerpt }}</span>
                </span>
                <Tag :value="`/${post.id}`" severity="secondary" />
              </RouterLink>
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.app-panel {
  border: 1px solid color-mix(in srgb, var(--p-card-color) 12%, transparent);
  box-shadow: 0 20px 40px -24px rgb(148 163 184 / 0.18);
}

.hero-panel {
  box-shadow: 0 28px 60px -28px var(--app-panel-shadow);
}

.eyebrow {
  color: var(--p-card-subtitle-color);
}

.hero-title,
.quick-link-title {
  color: var(--p-card-color);
}

.body-copy,
.code-panel,
.quick-link-copy {
  color: var(--p-card-color);
}

.muted-copy,
.code-label {
  color: var(--p-card-subtitle-color);
}

.code-panel {
  background: rgb(15 23 42);
  color: rgb(226 232 240);
}

.code-label {
  color: rgb(148 163 184);
}

.quick-link {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid color-mix(in srgb, var(--p-card-color) 10%, transparent);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--p-card-background) 92%, rgb(248 250 252));
  padding: 0.75rem 1rem;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.quick-link:hover {
  border-color: color-mix(in srgb, var(--p-card-color) 18%, transparent);
  background: color-mix(in srgb, var(--p-card-background) 86%, rgb(241 245 249));
}

:deep(.theme-switch) {
  display: flex;
}

:deep(.theme-switch .p-togglebutton) {
  flex: 1 1 0;
}

:global(html.app-dark) .app-panel {
  border-color: color-mix(in srgb, white 10%, transparent);
  box-shadow: 0 20px 40px -24px rgb(2 6 23 / 0.48);
}

:global(html.app-dark) .code-panel {
  background: rgb(2 6 23);
  color: rgb(226 232 240);
}

:global(html.app-dark) .code-label {
  color: rgb(148 163 184);
}

:global(html.app-dark) .quick-link {
  border-color: color-mix(in srgb, white 10%, transparent);
  background: color-mix(in srgb, var(--p-card-background) 96%, white);
}

:global(html.app-dark) .quick-link:hover {
  border-color: color-mix(in srgb, white 18%, transparent);
  background: color-mix(in srgb, var(--p-card-background) 90%, white);
}
</style>
