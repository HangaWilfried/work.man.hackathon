<template>
  <section class="space-y-7 w-[500px] mx-auto">
    <div class="space-y-2">
      <h1 class="text-xl font-black">Sign in to your account</h1>
      <p class="text-sm">
        Not a member ?
        <RouterLink class="text-blue-800 underline underline-offset-4" to="/auth/signup">
          create an account
        </RouterLink>
      </p>
    </div>
    <form @submit.prevent="performLogin" class="flex flex-col gap-7">
      <TextField v-model="user.email" text="email" :kind="Kind_Field.EMAIL" />
      <ButtonWrapper :is-loading="isLoading" :theme="Theme.BLUE" text="Sign in" />
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { supabase } from '@/lib'
import { Theme, Kind_Field } from '@/utils'

import TextField from '@/components/TextField.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import { useClientStore } from '@/stores/client'

const clientStore = useClientStore()

const isLoading = ref<boolean>(false)
const user = reactive({
  email: ''
})
const router = useRouter()

const performLogin = async (): Promise<void> => {
  isLoading.value = true
  try {
    await supabase.auth.signInWithOtp({
      email: user.email
    })

    clientStore.session.email = user.email
    await router.push({
      path: '/auth/otp-code',
      query: {
        q: 'login'
      }
    })
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}
</script>
