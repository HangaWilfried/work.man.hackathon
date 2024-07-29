<template>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke-width="1.5"
        :stroke="theme"
      />
    </svg>
  </template>
  
  <script setup lang="ts">
  import { Theme } from "@/utils";
  import type { PropType } from "vue";
  
  defineProps({
    theme: {
      type: String as PropType<Theme>,
      default: Theme.GRAY,
    },
  });
  </script>

  <style scoped>
  .white {
    @apply fill-white;
  }
  
  .gray {
    @apply fill-gray-300;
  }
  </style>
  