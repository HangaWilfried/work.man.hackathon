<template>
  <form @submit.prevent="performLogin" class="flex flex-col gap-7 w-[500px] mx-auto">
    <TextField v-model="otpCode" text="Enter OTP Code" :kind="Kind_Field.TEXT" />
    <ButtonWrapper :is-loading="isLoading" :theme="Theme.BLUE" text="Verify" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { supabase } from '@/lib'
import { Theme, Kind_Field } from '@/utils'
import { useClientStore } from '@/stores/client'

import TextField from '@/components/TextField.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'

const clientStore = useClientStore()

const isLoading = ref<boolean>(false)
const otpCode = ref<string>('')

const route = useRoute()
const router = useRouter()

const performLogin = async (): Promise<void> => {
  isLoading.value = true
  try {
    const { data } = await supabase.auth.verifyOtp({
      email: clientStore.session.email,
      token: otpCode.value,
      type: 'email'
    })
    if (data.session) {
      await supabase.from('User').insert({
        email: clientStore.session.email,
        id: data.user?.id
      })
      clientStore.session.user = data.user
      if (route.query.q === 'login') await router.push('/workers')
      else await router.push('/me/settings')
    }
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}
</script>
