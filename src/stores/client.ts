import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BreadCrumb } from '@/types';
import type { User } from '@supabase/supabase-js'

type State = {
  email: string;
  user: User | null;
  breadCrumb: BreadCrumb | undefined;
  searchText: string | undefined;
}

export const useClientStore = defineStore('client', () => {
  const session = ref<State>({
    email: '',
    user: null,
    searchText: undefined,
    breadCrumb: undefined
  })
  return { session }
})
