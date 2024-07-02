<template>
  <nav mt-6 inline-flex gap-2 text-xl>
    <button class="toggle-dark" @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>
  </nav>
</template>
