<template>
  <button :class="['rounded-md', theme]">
    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Theme } from '@/utils'

defineProps<{ theme: Theme; text: string; isLoading?: boolean }>()
</script>

<style scoped>
.blue {
  @apply flex px-4 py-2 gap-x-2 justify-center items-center bg-blue-800 text-white;
}

.light_blue {
  @apply flex px-4 py-2 gap-x-2 justify-center items-center bg-blue-600 text-white;
}

.extra_light_blue {
  @apply flex px-4 py-2 gap-x-2 justify-center items-center bg-blue-300 text-white;
}

.gray {
  @apply flex px-4 py-2 gap-x-2 items-center bg-gray-200 text-gray-300;
}

.red {
  @apply flex px-4 py-2 gap-x-2 items-center bg-red-800 text-white font-semibold;
}

.orange {
  @apply flex px-4 py-2 gap-x-2 items-center bg-orange-400 text-white;
}

.border_gray {
  @apply flex gap-x-2 px-2 py-1 items-center border border-gray-300/30 bg-transparent text-gray-900;
}

.border_blue {
  @apply flex gap-x-2 border-2 px-4 py-1.5 items-center justify-center border-blue-800 bg-transparent text-blue-800;
}

.white {
  @apply flex px-4 py-2 gap-x-2 items-center text-blue-600 bg-white;
}
</style>
