<template>
  <section class="grid grid-cols-4 gap-4 p-10">
    <RouterLink v-for="worker in workers" :key="worker.id" :to="`/workers/${worker.id}`">
      <SuggestWorker :user="worker" />
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { supabase } from '@/lib'
import { onBeforeMount, ref } from 'vue'

import SuggestWorker from '@/components/SuggestWorker.vue'
import type { User } from '@supabase/supabase-js'

const workers = ref<User[]>([])

onBeforeMount(async () => {
  try {
    const { data } = await supabase.from('User').select().eq('role', 'WORKER')
    workers.value = data as User[]
  } catch (error) {
    console.log(error)
  }
})
</script>
