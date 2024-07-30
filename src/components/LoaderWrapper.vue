<template>
  <section class="grid grid-cols-4 gap-4">
    <div
      v-for="i in 12"
      :key="i"
      class="p-4 rounded-lg border border-gray-300 flex gap-2 items-center animate-pulse"
    >
      <div class="w-10 h-10 rounded-full bg-gray-300"></div>
      <div class="flex flex-col gap-1">
        <div class="h-4 w-10 bg-gray-300 rounded-lg"></div>
        <div class="h-8 w-24 bg-gray-300 rounded-lg"></div>
        <div class="h-6 w-40 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </section>
</template>
