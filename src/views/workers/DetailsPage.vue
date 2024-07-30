<template>
  <section class="flex flex-col gap-4">
    <div class="p-10 flex justify-center" v-if="isLoading">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <template v-else>
      <BreadCrumb />
      <main class="bg-gray-100 min-h-screen py-10">
        <section class="flex flex-col gap-2 m-auto w-[80%]">
          <section class="rounded-lg bg-white flex flex-col">
            <div class="w-full h-[120px] bg-blue-50 relative rounded-t-lg">
              <div class="z-10 left-10 absolute top-1/4 rounded-full w-32 h-32">
                <BaseImage
                  :source="user?.avatar ?? ''"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div class="p-4 flex justify-end">
                <ButtonWrapper class="!min-w-20 !bg-orange-500" text="Book" :theme="Theme.BLUE" />
              </div>
            </div>
            <div class="bg-white p-4 pt-10 grid grid-cols-3 gap-4 rounded-lg">
              <div class="flex flex-col">
                <h1>Name</h1>
                <span>{{ user.name }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Email</h1>
                <span>{{ user.email }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Contact</h1>
                <span>
                  +{{ profile?.contact.mobile.countryCode }}
                  {{ profile?.contact.mobile.number }}
                </span>
              </div>
              <div class="flex flex-col">
                <h1>Location</h1>
                <span>{{ profile?.contact.location }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Whatsapp</h1>
                <span>{{ profile?.contact.whatsapp }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Id card number</h1>
                <span>{{ profile?.contact.idCardNumber }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Domain</h1>
                <span>{{ user.job }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Years of experience</h1>
                <span>{{ profile?.qualifications?.experience }}</span>
              </div>
              <div class="flex flex-col">
                <h1>Available</h1>
                <div class="text-blue-500 flex gap-2 items-center">
                  <span class="w-2 h-2 rounded-full shrink-0 bg-blue-500"></span>
                  <span>yes</span>
                </div>
              </div>
            </div>
          </section>
          <section class="rounded-lg p-4 bg-white shadow space-y-3">
            <h1 class="font-black">Skills</h1>
            <div class="flex flex-wrap gap-2 items-center">
              <span
                v-for="skill in profile?.qualifications.skills"
                :key="skill"
                class="rounded-md border border-gray-300 py-1 px-2"
              >
                {{ skill }}
              </span>
            </div>
          </section>
          <section class="rounded-lg p-4 bg-white shadow space-y-3">
            <h1 class="font-black">qualifications</h1>
            <div class="flex flex-wrap gap-2 items-center">
              <span
                v-for="qualification in profile?.certifications"
                :key="qualification"
                class="rounded-md border border-gray-300 py-1 px-2"
              >
                {{ qualification }}
              </span>
            </div>
          </section>
          <section class="rounded-lg p-4 bg-white/50 shadow space-y-4">
            <h1>Reviews</h1>
            <span v-if="areReviewLoading" class="loading loading-ring loading-lg"></span>
            <div v-else-if="reviews.length" class="grid grid-cols-2 gap-4">
              <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
            </div>
            <span v-else>There is nothing for now</span>
          </section>
        </section>
      </main>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useClientStore } from '@/stores/client'

import BreadCrumb from '@/components/BreadCrumb.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import { supabase } from '@/lib'
import type { Review, Profile } from '@/types'
import { useRoute } from 'vue-router'
import BaseImage from '@/components/BaseImage.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import { Theme } from '@/utils'

const clientStore = useClientStore()

const props = defineProps<{ id: string }>()

const user = ref({
  name: '',
  email: '',
  job: '',
  avatar: ''
})

const reviews = ref<Review[]>([])
const profile = ref<Profile>()

const route = useRoute()

const isLoading = ref<boolean>(false)
const areReviewLoading = ref<boolean>(false)

const fetchReviews = async (): Promise<void> => {
  areReviewLoading.value = true
  try {
    const { data } = await supabase.from('Review').select().eq('workerId', props.id)
    reviews.value = data as Review[]
  } catch (error) {
    console.log(error)
  } finally {
    areReviewLoading.value = false
  }
}

const fetchProfile = async (profileId: string): Promise<void> => {
  try {
    const { data } = await supabase.from('Profile').select().eq('id', profileId)
    profile.value = data?.[0] as Profile
  } catch (error) {
    console.log(error)
  }
}

const fetchUser = async (): Promise<void> => {
  isLoading.value = true
  try {
    const { data } = await supabase.from('User').select().eq('id', route.params.id)
    const info = data[0]
    user.value.email = info?.email
    user.value.name = info?.username
    user.value.job = info?.job
    user.value.avatar = info.avatar

    await fetchProfile(info.profile_id)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await fetchUser()
  clientStore.session.breadCrumb = {
    home: 'Workers',
    path: '/workers',
    items: [
      {
        name: user.value.name,
        path: ''
      }
    ]
  }
  await fetchReviews()
})
</script>

<style scoped>
h1 {
  @apply font-black;
}
</style>
