<template>
  <div class="field-group">
    <label v-if="text" :for="text">{{ text }}</label>
    <input
      class="field"
      :placeholder="placeholder"
      :type="kind"
      v-model="model"
      :id="text"
      autocomplete="off"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

type FieldProps = {
  text?: string
  kind: string
  placeholder?: string
}

withDefaults(defineProps<FieldProps>(), {
  text: ''
})
</script>
