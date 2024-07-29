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
            {{ createdAt }}
          </span>
        </div>
        <UserRating :modelValue="evaluation" class-name="w-3 h-3" />
      </div>
    </div>
    <div data-test="content" v-if="content">
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
import { computed, ref } from 'vue'
import UserRating from './UserRating.vue'

type Review = {
  author: string
  content: string
  createdAt: string
  evaluation: number
}

const props = defineProps<Review>()

const MAX_MESSAGES_LINES = 140
const canReadAll = ref<boolean>(false)

const isMessageTooLong = computed<boolean>(() => {
  return props.content.length > MAX_MESSAGES_LINES
})

const getMessage = computed<string>(() => {
  if (canReadAll.value || !isMessageTooLong.value) {
    return props.content
  }
  return props.content.substring(0, MAX_MESSAGES_LINES)
})

const initials = computed<string>(() => {
  const [lastname, ...firstname] = props.author.split(' ')
  return lastname[0] + firstname.join('').split('')[0]
})
</script>
