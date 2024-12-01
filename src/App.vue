<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <main>
    <RouterView />
    <VueQueryDevtools />
  </main>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
