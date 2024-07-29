<template>
  <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.8346 11.667L12.168 23.3337"
      :class="theme"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
    <path
      d="M12.1654 11.667L23.832 23.3337"
      :class="theme"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { Theme } from '@/utils/'

defineProps({
  theme: {
    type: String as PropType<Theme>,
    default: Theme.LIGHT_GRAY
  }
})
</script>
<style scoped>
.blue {
  @apply stroke-blue-600;
}

.light_gray {
  @apply stroke-gray-300;
}
</style>
