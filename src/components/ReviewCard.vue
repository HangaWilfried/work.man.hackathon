<template>
  <section class="rounded-lg bg-white p-4 space-y-4">
    <div class="flex gap-2 items-start">
      <span data-test="initials" class="uppercase rounded-lg shrink-0 p-1.5 bg-gray-100 font-bold">
        {{ initials }}
      </span>
      <div class="grow flex flex-col gap-2 lg:items-baseline lg:flex-row lg:justify-between">
        <div class="flex flex-col gap-1">
          <span data-test="author" class="font-bold">
            {{ author }}
          </span>
          <span data-test="createdAt" class="text-sm">
            {{ getConvertedDate(review.created_at) }}
          </span>
        </div>
        <UserRating :modelValue="review.rate" class-name="w-3 h-3" />
      </div>
    </div>
    <div data-test="content" v-if="review.message">
      {{ getMessage }}
      <span
        v-if="isMessageTooLong"
        data-test="viewMoreBtn"
        @click="canReadAll = !canReadAll"
        class="cursor-pointer text-green-500 text-lg underline underline-offset-2"
      >
        {{ canReadAll ? 'Read Less' : 'Read More' }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { Review } from '@/types'
import UserRating from './UserRating.vue'
import { supabase } from '@/lib'
import { getConvertedDate } from '@/utils/date'

const props = defineProps<{ review: Review }>()

const author = ref<string>('')

const fetchUserById = async (): Promise<void> => {
  const { data } = await supabase.from('User').select().eq('id', props.review.customerId)
  author.value = data[0].username
}

onBeforeMount(async () => {
  await fetchUserById()
})

const MAX_MESSAGES_LINES = 140
const canReadAll = ref<boolean>(false)

const isMessageTooLong = computed<boolean>(() => {
  return props.review.message.length > MAX_MESSAGES_LINES
})

const getMessage = computed<string>(() => {
  if (canReadAll.value || !isMessageTooLong.value) {
    return props.review.message
  }
  return props.review.message.substring(0, MAX_MESSAGES_LINES)
})

const initials = computed<string>(() => {
  const [lastname, ...firstname] = author.value.split('')
  return lastname + firstname.join('').split('')[0]
})
</script>
