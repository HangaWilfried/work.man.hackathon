<template>
  <section class="flex gap-4 border shadow p-4">
    <div class="w-20 h-20 aspect-square rounded-full overflow-hidden shadow">
      <BaseImage class="object-cover" :source="user?.avatar ?? ''" />
    </div>
    <div class="flex flex-col gap-2 text-sm">
      <span>{{ user?.username }}</span>
      <span>{{ user?.email }}</span>
      <UserRating :modelValue="user?.rate" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js'

import BaseImage from '@/components/BaseImage.vue'
import UserRating from '@/components/UserRating.vue'

defineProps<{
  user: User
}>()
</script>
