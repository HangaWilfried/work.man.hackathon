<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <MenuIcon class="w-6 h-5" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="flex flex-col">
            <template v-for="menu in menus" :key="menu">
              <MenuItem v-slot="{ active }" class="py-1 px-2">
                <RouterLink :to="menu" :exact-active-class="active ? 'text-blue-100' : ''">{{
                  menu
                }}</RouterLink>
              </MenuItem>
            </template>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import MenuIcon from '@/icons/MenuIcon.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const menus = ['orders', 'becomeMember']
</script>
