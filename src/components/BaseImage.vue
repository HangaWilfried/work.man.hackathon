<template>
  <div class="w-full h-full">
    <div v-if="isLoading" class="w-full h-full animate-pulse bg-gray-300"></div>
    <img v-else :src="url" :class="[$attrs.class, 'w-full h-full']" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'

const props = defineProps<{ source: string; isLocale?: boolean }>()
const isLoading = ref<boolean>(true)

const url = computed(() => {
  if (props.isLocale) return new URL(`../assets/${props.source}`, import.meta.url).href
  return props.source
})

onBeforeMount(() => {
  const timeout = setTimeout(() => {
    isLoading.value = false
    clearTimeout(timeout)
  }, 500)
})
</script>
