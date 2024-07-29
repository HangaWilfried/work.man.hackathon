<template>
  <section class="flex flex-col">
    <article>
      <h1>Most rates</h1>
      <div class="grid grid-cols-3 gap-2">
        <SuggestWorker
          v-for="worker in workers"
          :key="worker.id"
          :is-available="true"
          source=""
          :username="worker?.email || ''"
        />
      </div>
    </article>
    <section class="grid grid-cols-4 gap-4">
      <RouterLink v-for="worker in workers" :key="worker.id" :to="`/workers/${worker.id}`">
        <SuggestWorker :is-available="true" source="" :username="worker?.email || ''" />
      </RouterLink>
    </section>
  </section>
</template>

<script setup lang="ts">
import { supabase } from '@/lib'
import { onBeforeMount, ref } from 'vue'

import SuggestWorker from '@/components/SuggestWorker.vue'
import type { User } from '@supabase/supabase-js'

const workers = ref<User[]>([])

/*
* email: "juniorlagoue@gmail.com"
id: "2eaa220c-4932-4726-957a-faa7add21e46"
isAvailable: true
profile_id: null
role: "USER"
* */

onBeforeMount(async () => {
  try {
    const { data } = await supabase.from('User').select()
    workers.value = data as User[]
  } catch (error) {
    console.log(error)
  }
})
</script>
