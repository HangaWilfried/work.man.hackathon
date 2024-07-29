<template>
  <div>
    <header class="flex justify-between bg-white shadow px-10 py-2.5">
      <h1>Logo</h1>
      <div class="min-w-[300px] flex gap-4 items-center">
        <SearchBar />
        <UserMenu v-if="user?.id" />
        <RouterLink class="w-fit shrink-0" v-else to="/auth/signin">
          <ButtonWrapper class="!py-2.5" :theme="Theme.BLUE" text="Join us" />
        </RouterLink>
      </div>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Theme } from '@/utils'
import { useClientStore } from '@/stores/client'
import { RouterView, RouterLink } from 'vue-router'

import UserMenu from '@/components/UserMenu.vue'
import SearchBar from '@/components/SearchBar.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'

const clientStore = useClientStore()

const user = computed(() => clientStore.session.user)
</script>
