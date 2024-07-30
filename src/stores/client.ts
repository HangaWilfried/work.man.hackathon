import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { BreadCrumb } from '@/types'
import type { User } from '@supabase/supabase-js'

type State = {
  email: string
  user: User | null
  searchText: string | undefined
  breadCrumb: BreadCrumb | undefined
}

export const useClientStore = defineStore(
  'client',
  () => {
    const session = ref<State>({
      email: '',
      user: null,
      searchText: undefined,
      breadCrumb: undefined
    })

    const getSearchText = computed(() => session.value.searchText)

    const setSearchText = (text: string): void => {
      session.value.searchText = text
    }

    const cleanSearchText = (): void => {
      session.value.searchText = undefined
    }

    return { session, cleanSearchText, setSearchText, getSearchText }
  },
  {
    persist: true
  }
)
