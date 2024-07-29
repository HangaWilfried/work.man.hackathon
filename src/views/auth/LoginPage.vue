<template>
  <section class="py-4 sm:py-7 lg:p-10 min-h-screen lg:flex">
    <section class="flex flex-col gap-7 w-[90%] max-w-[700px] m-auto">
      <span>Logo</span>
      <div class="space-y-2">
        <h1 class="text-xl font-black">Sign in to your account</h1>
        <p class="text-sm">
          Not a member ?
          <RouterLink class="text-blue-800 underline underline-offset-4" to="/auth/signup"
            >create an account</RouterLink
          >
        </p>
      </div>
      <form @submit.prevent="performLogin" class="flex flex-col gap-7">
        <TextField v-model="user.email" text="email" :kind="Kind_Field.EMAIL" />
        <ButtonWrapper :is-loading="isLoading" :theme="Theme.BLUE" text="Sign in" />
      </form>
    </section>
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
      email: user.email,
      options: {
        shouldCreateUser: false
      }
    })

    clientStore.session.email = user.email
    await router.push('/auth/otp-code')
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}
</script>

<style scoped>
.bulle {
  clip-path: circle(48% at 50% 50%);
  animation: shape infinite 2s linear reverse;
}

@keyframes shape {
  0%,
  40% {
    clip-path: circle(89% at 62% 98%);
  }
  100% {
    clip-path: circle(48% at 73% 93%);
  }
}
</style>
