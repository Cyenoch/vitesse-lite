<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { posts } from "@/data/posts";
import { usePostQuery } from "@/composables";

const route = useRoute();
const postId = computed(() => {
  const value = route.params.id;
  return Array.isArray(value) ? value[0] : value;
});

const { data: post, error, isPending } = usePostQuery(postId);
</script>

<template>
  <section class="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Pinia Colada demo
        </p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">/posts/{{ postId }}</h1>
      </div>
      <RouterLink
        to="/"
        class="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Back to home
      </RouterLink>
    </div>

    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-medium text-slate-500">Query key</p>
      <code
        class="mt-2 block overflow-x-auto rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
      >
        ["posts", "{{ postId }}"]
      </code>

      <div v-if="isPending" class="mt-6 rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-600">
        Loading the post for the current route param...
      </div>

      <div
        v-else-if="error"
        class="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700"
      >
        {{ error.message }}
      </div>

      <article v-else-if="post" class="mt-6 space-y-5">
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500"
            >
              {{ tag }}
            </span>
          </div>
          <h2 class="text-2xl font-semibold text-slate-950">{{ post.title }}</h2>
          <p class="text-sm text-slate-500">Updated {{ post.updatedAt }}</p>
        </div>

        <p class="text-base leading-7 text-slate-700">
          {{ post.content }}
        </p>
      </article>
    </div>

    <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <p class="text-sm font-medium text-slate-500">Try another route param</p>
      <div class="mt-4 flex flex-wrap gap-3">
        <RouterLink
          v-for="entry in posts"
          :key="entry.id"
          :to="`/posts/${entry.id}`"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
        >
          {{ entry.title }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
