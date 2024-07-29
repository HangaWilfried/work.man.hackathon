<template>
  <button :class="['rounded-lg', theme]">
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
  @apply text-white bg-blue-500 p-2;
}
</style>
