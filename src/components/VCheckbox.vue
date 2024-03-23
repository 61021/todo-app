<script setup lang="ts">
// const props = defineProps<{
//   modelValue?: any
// }>()

// const emit = defineEmits(['update:modelValue'])

const value = defineModel()
</script>

<template>
  <button
    v-if="value"
    text="2xl emerald500"
    type="button"
    i-ph-check-circle-duotone
    @click="value = !value"
  />
  <button
    v-else
    text="2xl dark:slate200"
    type="button"
    i-ph-circle-duotone
    @click="value = !value"
  />
</template>
