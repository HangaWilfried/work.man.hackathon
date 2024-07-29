<template>
  <section class="flex flex-col gap-4">
    <BreadCrumb />
    <main class="bg-gray-100 min-h-screen py-10">
    <section class="flex flex-col gap-2 m-auto w-[80%]">
      <section class="rounded-lg bg-white h-[300px]">
        <div class="w-full h-[44%] bg-blue-50 relative">
          <div class="z-10 left-10 absolute bg-blue-50 top-1/4 rounded-full w-32 h-32">
            <img :src="user.profile" alt="" class="w-full h-full" />
          </div>
        </div>
        <div class="bg-white p-4 pt-10 flex flex-wrap justify-evenly">
          <div class="flex flex-col gap-2">
            <h1>Name</h1>
            <span>{{ user.name }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <h1>Email</h1>
            <span>{{ user.email }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <h1>Domain</h1>
            <span>{{ user.job }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <h1>Years of experience</h1>
            <span>10</span>
          </div>
          <div class="flex flex-col gap-2">
            <h1>Available</h1>
            <div class="text-blue-500 flex gap-2 items-center">
              <span class="w-2 h-2 rounded-full shrink-0 bg-blue-500"></span>
              <span>yes</span>
            </div>
          </div>
        </div>
      </section>
      <section class="rounded-lg p-4 bg-white shadow space-y-3">
        <h1 class="font-black">Qualifications</h1>
        <div class="flex flex-wrap gap-2 items-center">
          <span
            v-for="qualification in qualifications"
            :key="qualification"
            class="rounded-md border border-gray-300 py-1 px-2"
          >
            {{ qualification }}
          </span>
        </div>
      </section>
      <section class="rounded-lg p-4 bg-white shadow space-y-3">
        <h1 class="font-black">Skills</h1>
        <div class="flex flex-wrap gap-2 items-center">
          <span
            v-for="skill in skills"
            :key="skill"
            class="rounded-md border border-gray-300 py-1 px-2"
          >
            {{ skill }}
          </span>
        </div>
      </section>
      <section class="rounded-lg p-4 bg-white/50 shadow space-y-4">
        <h1>Reviews</h1>
        <div class="grid grid-cols-3 gap-4">
          <ReviewCard author="" :evaluation="3" content="description" created-at="" />
        </div>
      </section>
    </section>
  </main>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useClientStore } from '@/stores/client';

import BreadCrumb from '@/components/BreadCrumb.vue';
import ReviewCard from '@/components/ReviewCard.vue';

const clientStore = useClientStore();

defineProps<{ id: string }>()

const user = ref({
  name: '',
  email: '',
  job: '',
  profile: '',
});

const skills = ref(['product design', 'ux design', 'google analysis']);
const qualifications = ref(['Bachelor degree', 'GCE Old level', 'Technical advance level']);

onBeforeMount(() => {
  clientStore.session.breadCrumb = {
    home: "Workers",
    path: "/workers",
    items: [
      {
        name: user.value.name,
        path: ''
      }
    ],
  }
});
</script>
