<script setup lang="ts">
import { posts } from "@/data/posts";
</script>

<template>
  <section class="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10">
    <div class="max-w-3xl space-y-6">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Vitesse Lite</p>
      <div class="space-y-4">
        <h1 class="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          A lean Vue starter built on Vite+.
        </h1>
        <p class="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          File-based routing with Vue Router 5, app state with Pinia, and route-driven async data
          with Pinia Colada. The template keeps one realistic example and removes the rest.
        </p>
      </div>
      <div class="flex flex-wrap gap-3 text-sm text-slate-600">
        <span class="rounded-full border border-slate-200 bg-white px-3 py-1">Vue 3</span>
        <span class="rounded-full border border-slate-200 bg-white px-3 py-1">Vite+</span>
        <span class="rounded-full border border-slate-200 bg-white px-3 py-1">Vue Router 5</span>
        <span class="rounded-full border border-slate-200 bg-white px-3 py-1">Pinia</span>
        <span class="rounded-full border border-slate-200 bg-white px-3 py-1">Pinia Colada</span>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-slate-500">Included example</p>
            <h2 class="mt-2 text-2xl font-semibold text-slate-950">Route-aware post details</h2>
          </div>
          <RouterLink
            to="/posts/1"
            class="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open example
          </RouterLink>
        </div>

        <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
          The `/posts/[id]` route reads the current route param, derives a query key from it, and
          fetches the matching entry through Pinia Colada. It is the single async-data example kept
          in the template.
        </p>

        <div class="mt-6 rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
          <p class="text-slate-400">Pattern</p>
          <code class="mt-2 block overflow-x-auto">key: () =&gt; ["posts", route.params.id]</code>
        </div>
      </article>

      <aside class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p class="text-sm font-medium text-slate-500">Quick links</p>
        <ul class="mt-4 space-y-3">
          <li v-for="post in posts" :key="post.id">
            <RouterLink
              :to="`/posts/${post.id}`"
              class="flex items-start justify-between rounded-2xl border border-transparent bg-white px-4 py-3 transition hover:border-slate-200 hover:bg-slate-100"
            >
              <span>
                <span class="block font-medium text-slate-900">{{ post.title }}</span>
                <span class="mt-1 block text-sm text-slate-500">{{ post.excerpt }}</span>
              </span>
              <span class="text-sm text-slate-400">/{{ post.id }}</span>
            </RouterLink>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>
