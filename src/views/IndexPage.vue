<template>
  <div>
    <header class="flex justify-between px-10 py-5 bg-[url(@/assets/font.jpg)]">
      <h1 class="flex gap-2 items-center">
        <div class="w-10 h-10">
          <BaseImage
            class="w-full h-full rounded-full object-cover"
            :isLocale="true"
            source="dark-logo.png"
          />
        </div>
        <span class="text-4xl font-bold">WORKMAN</span>
      </h1>
      <div class="flex gap-20 items-center text-xl text-blue">
        <DropDown label="Find Workers" :options="skills" @update:modelValue="applySearch">
          <template #header="{ label }">
            <RouterLink exactActiveClass="text-blue-500" to="/workers">{{ label }}</RouterLink>
          </template>
        </DropDown>
        <RouterLink to="/me/settings" exactActiveClass="text-blue-500">Settings</RouterLink>
        <a class="hover:text-blue-500" href="https://retailer-ks2h.onrender.com">Buy products</a>
        <a class="hover:text-blue-500" href="https://work-man.onrender.com">Discover</a>
        <span
          v-if="initials"
          data-test="initials"
          class="uppercase rounded-lg shrink-0 p-1.5 bg-gray-100 font-bold"
        >
          {{ initials }}
        </span>
      </div>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/client'

import BaseImage from '@/components/BaseImage.vue'
import DropDown from '@/components/DropDown.vue'
import { Job } from '@/utils'
import { Workman } from '@/types'

const clientStore = useClientStore()

const initials = computed(() => {
  if (clientStore.session.user) {
    const [lastname, ...firstname] = clientStore.session.user.username.split('')
    return lastname + firstname.join('').split('')[0]
  }
  return ''
})

const skills = Object.keys(Job).map((k) => new Workman(k as keyof typeof Job))

const router = useRouter()

const applySearch = async (skill: keyof typeof Job): Promise<void> => {
  clientStore.setSearchText(skill)
  await router.push('/')
}
</script>
