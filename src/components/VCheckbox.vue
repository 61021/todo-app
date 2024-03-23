<script setup lang="ts">
const props = defineProps<{
  modelValue?: any
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <Transition name="fade">
    <VIconCheckAnimated
      v-if="props.modelValue"
      flex
      class="h7 w7"
      @click="emit('update:modelValue', !props.modelValue)"
    />
    <button
      v-else
      text="dark:slate200 hover:primary-500"

      class="h7 w7 flex duration-500 active:scale-125"
      type="button"
      i-ph-circle-duotone
      @click="emit('update:modelValue', !props.modelValue)"
    />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
