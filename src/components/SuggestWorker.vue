<template>
  <section class="flex gap-4 border shadow p-4">
    <div class="w-20 h-20 aspect-square rounded-full overflow-hidden shadow">
      <BaseImage :source="avatar ?? ''"/>
      <!-- <img class="w-full h-full rounded-full" :src="avatar" alt="profile" /> -->
    </div>
    <div class="flex flex-col gap-2 text-sm">
      <span>{{ user.username }}</span>
      <span>{{ user.email }}</span>
      <UserRating :modelValue="user.rate" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { supabase } from '@/lib';
import type { Profile } from '@/types';
import type { User } from '@supabase/supabase-js'

import BaseImage from '@/components/BaseImage.vue'
import UserRating from '@/components/UserRating.vue'


const props = defineProps<{
  user: User
}>()

const avatar = ref<string>();

const fetchProfile = async (profileId: string): Promise<void> => {
  try {
    const { data } = await supabase.from('Profile').select().eq('id', profileId)
    avatar.value = (data?.[0] as Profile).avatar;
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  await fetchProfile(props.user?.profile_id);
})
</script>
