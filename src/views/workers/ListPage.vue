<template>
  <section class="flex flex-col gap-10 p-10">
    <LoaderWrapper v-if="isLoading" />
    <template v-else>
      <div class="flex flex-col gap-2" v-if="clientStore.getSearchText">
        <h1 class="text-lg font-bold">Search results</h1>
        <div class="flex">
          <div
            @click="clientStore.cleanSearchText()"
            class="text-sm text-gray-600 cursor-pointer rounded-md px-2 py-0.5 border border-gray-300 capitalize font-bold flex gap-2 items-center"
          >
            <span class="capitalize">
              {{ clientStore.getSearchText.replace('_', ' ').toLowerCase() }}
            </span>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <RouterLink v-for="worker in workers" :key="worker.id" :to="`/workers/${worker.id}`">
          <SuggestWorker :user="worker" />
        </RouterLink>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { supabase } from '@/lib'
import { onBeforeMount, ref, watch } from 'vue'

import type { User } from '@supabase/supabase-js'
import { useClientStore } from '@/stores/client'

import CloseIcon from '@/icons/CloseIcon.vue'
import SuggestWorker from '@/components/SuggestWorker.vue'
import LoaderWrapper from '@/components/LoaderWrapper.vue'

const clientStore = useClientStore()

const workers = ref<User[]>([])
const isLoading = ref<boolean>(false)

watch(
  () => clientStore.getSearchText,
  async () => {
    await fetchWorkers()
  }
)

const fetchWorkers = async (): Promise<void> => {
  isLoading.value = true
  try {
    const { data } = await supabase
      .from('User')
      .select()
      .eq(clientStore.getSearchText ? 'job' : 'role', clientStore.getSearchText ?? 'WORKER')
    workers.value = data as User[]
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await fetchWorkers()
})
</script>
