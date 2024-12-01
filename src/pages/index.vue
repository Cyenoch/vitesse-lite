<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="grid items-center justify-center h-screen">
    <div class="mx-auto inline-grid grid-cols-1 gap-4">
      <h1 class="text-center text-2xl font-bold font-inter">
        Index page
      </h1>

      <Button>
        <i class="i-line-md-hash" />
        Hello
      </Button>

      <Button @click="toggleDark(!isDark)">
        <i v-if="isDark" class="i-line-md-sunny-filled-loop-to-moon-filled-alt-loop-transition" />
        <i v-else class="i-line-md-moon-filled-to-sunny-filled-loop-transition" />
        Dark Mode Toggle
      </Button>
    </div>
  </div>
</template>
