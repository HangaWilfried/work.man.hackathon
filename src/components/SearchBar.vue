<template>
  <div class="w-full relative h-9 lg:h-12 text-gray-900">
    <!--        <GlassSearchIcon class="absolute w-4 h-4 lg:w-6 lg:h-6 top-3 left-2" />-->
    <input
      v-model="queryText"
      placeholder="Find workman"
      data-test="searchByKeyword"
      @keyup.enter="searchByKeyword"
    />
    <div class="flex gap-1 items-center absolute top-1.5 right-1">
      <ButtonWrapper
        :theme="theme"
        text="search"
        @click="searchByKeyword"
        class="text-[9px] tablet:text-xs lg:text-sm !rounded-lg !px-2"
      />
      <CloseIcon
        @click="clearQueryText"
        class="cursor-pointer w-4 h-4 tablet:w-6 tablet:h-6 lg:w-8 lg:h-8"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Theme } from '@/utils'
import { computed, ref } from 'vue'
import { useClientStore } from '@/stores/client'

import CloseIcon from '@/icons/CloseIcon.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'

const clientStore = useClientStore()

const queryText = ref<string>('')

const theme = computed<Theme>(() => (queryText.value.trim() ? Theme.BLUE : Theme.GRAY))

const searchByKeyword = () => {
  if (!queryText.value.trim()) return
  clientStore.session.searchText = queryText.value
}

const clearQueryText = (): void => {
  queryText.value = ''
  clientStore.session.searchText = queryText.value
}
</script>

<style scoped>
input {
  @apply inset-0 px-4 w-full h-full outline-none border border-gray-300
  focus:shadow focus:shadow-blue-50 focus:border-blue-500 rounded-md;
}
</style>
