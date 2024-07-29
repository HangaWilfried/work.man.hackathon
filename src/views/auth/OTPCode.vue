<template>
  <section class="py-4 sm:py-7 lg:p-10 min-h-screen lg:flex">
    <section class="flex flex-col gap-7 w-[90%] max-w-[700px] m-auto">
      <span>Logo</span>
      <form @submit.prevent="performLogin" class="flex flex-col gap-7">
        <TextField v-model="otpCode" text="Enter OTP Code" :kind="Kind_Field.TEXT" />
        <ButtonWrapper :is-loading="isLoading" :theme="Theme.BLUE" text="Verify" />
      </form>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/lib'
import { Theme, Kind_Field } from '@/utils'

import TextField from '@/components/TextField.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import { useClientStore } from '@/stores/client'

const clientStore = useClientStore()

const isLoading = ref<boolean>(false)
const otpCode = ref<string>('')

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
      await router.push('/workers')
    }
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}
</script>
