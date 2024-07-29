import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClientStore = defineStore('client', () => {
  const session = ref({
    email: ''
  })
  return { session }
})
