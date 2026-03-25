<template>
  <section
    class="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16 sm:px-10"
  >
    <p class="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">404</p>
    <div class="space-y-3">
      <h1 class="text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
      <p class="max-w-xl text-base leading-7 text-slate-600">
        This starter keeps routing intentionally small. Head back to the homepage or open the
        bundled Pinia Colada example route.
      </p>
    </div>
    <div class="flex flex-wrap gap-3">
      <RouterLink
        to="/"
        class="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Go home
      </RouterLink>
      <RouterLink
        to="/posts/1"
        class="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Open example
      </RouterLink>
    </div>
  </section>
</template>
