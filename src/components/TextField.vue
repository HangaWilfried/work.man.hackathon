<template>
  <div class="field-group">
    <label :for="text">{{ text }}</label>
    <input class="field" :type="kind" v-model="model" :id="text" autocomplete="off" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

type FieldProps = {
  text: string
  kind: string
}

defineProps<FieldProps>()
</script>
