<template>
  <div class="flex items-center p-4 pb-0" data-test="breadcrumb-container">
    <div class="flex items-center">
      <span
        :class="['cursor-pointer font-medium capitalize', theme]"
        @click="goTo(crumb?.path || '')"
        data-test="home"
        >{{ crumb?.home }}</span
      >
      <ul
        v-for="(item, index) in crumb?.items"
        :key="index"
        class="flex gap-2 items-center"
        data-test="breadcrumb"
      >
        <li class="flex items-center">
          <slot>
            <SliderIcon class="-rotate-90 w-7 h-7" />
          </slot>
        </li>
        <li>
          <button
            @click="goTo(item.path)"
            :disabled="isLastCrumb(index)"
            :class="[
              'font-medium font-be-vietnam',
              isLastCrumb(index) ? 'text-black cursor-not-allowed' : theme
            ]"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, type PropType } from 'vue'

import { Theme } from '@/utils'
import type { BreadCrumb } from '@/types'
import { useClientStore } from '@/stores/client'
import SliderIcon from '@/icons/SliderIcon.vue'

const clientStore = useClientStore()

defineProps({
  theme: {
    type: String as PropType<Theme>,
    default: Theme.GRAY
  }
})

const crumb = computed((): BreadCrumb | undefined => clientStore.session.breadCrumb)
const router = useRouter()
const goTo = (path: string): void => {
  router.push(path)
}

const isLastCrumb = (index: number): boolean => {
  if (!crumb.value) return false
  return index === crumb.value?.items?.length - 1
}
</script>

<style scoped>
.white {
  @apply text-white;
}

.gray {
  @apply text-gray-500;
}
</style>
