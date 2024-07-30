<template>
  <section ref="dropdown" class="relative">
    <div class="cursor-pointer flex gap-2 items-center">
      <slot name="header" :label="label">
        <span>{{ label }}</span>
      </slot>
      <ChevronDownIcon
        :class="['duration-300 ease-linear', shouldDisplayOptions ? 'rotate-180' : 'rotate-0']"
        @click="toggleShowOptionsStatus"
      />
    </div>
    <div
      v-if="shouldDisplayOptions"
      class="flex flex-col absolute shadow-sm top-8 bg-white z-10 right-0 min-w-[300px] min-h-[100px] rounded-lg border border-gray-100"
    >
      <span
        class="cursor-pointer hover:text-blue-500 p-4 rounded"
        @click="selectOption(option)"
        v-for="option in options"
        :key="option.text"
      >
        {{ option.text }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@/icons/ChevronDownIcon.vue'
import type { Option } from '@/types'
import { useDetectOutsideClick } from '@/utils/method'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
defineProps<{ options: Option<unknown>[]; label: string }>()

const shouldDisplayOptions = ref<boolean>(false)

const toggleShowOptionsStatus = (): void => {
  shouldDisplayOptions.value = !shouldDisplayOptions.value
}

const closeOptions = (): void => {
  shouldDisplayOptions.value = false
}

const selectOption = (option: Option<unknown>) => {
  emit('update:modelValue', option.data)
  closeOptions()
}

const dropdown = ref<HTMLElement | undefined>()

useDetectOutsideClick(dropdown, () => {
  closeOptions()
})
</script>
