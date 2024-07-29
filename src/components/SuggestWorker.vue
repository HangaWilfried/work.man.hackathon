<template>
  <section class="flex gap-4 border shadow">
    <div class="w-6 h-6 aspect-square rounded-full overflow-hidden">
      <img class="w-full h-full rounded-full" :src="source" alt="profile" />
    </div>
    <div class="flex flex-col gap-2">
      <span>{{ username }}</span>
      <UserRating :modelValue="3" />
    </div>
  </section>
</template>

<script setup lang="ts">
import UserRating from '@/components/UserRating.vue'
defineProps<{
  source: string
  username: string
  isAvailable: boolean
}>()
</script>
