<template>
    <div class="w-full h-full">
        <div v-if="isLoading" class="w-full h-full animate-pulse bg-gray-300"></div>
        <img v-else :src="source" :class="[$attrs.class, 'w-full h-full']" />
    </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue'

defineProps<{source: string}>();
const isLoading = ref<boolean>(true)

onBeforeMount(() => {
    const timeout = setTimeout(() => {
        isLoading.value = false;
        clearTimeout(timeout);
    }, 500);
})
</script>