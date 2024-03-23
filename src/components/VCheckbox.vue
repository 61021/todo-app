<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import checkSound from '~/assets/sounds/check.mp3'
import uncheckSound from '~/assets/sounds/uncheck.mp3'

const props = defineProps<{
  modelValue?: any
}>()

const emit = defineEmits(['update:modelValue'])

const { play: playCheck } = useSound(checkSound)
const { play: playUncheck } = useSound(uncheckSound)
</script>

<template>
  <Transition name="fade">
    <VIconCheckAnimated
      v-if="props.modelValue"
      flex

      class="h7 w7"
      @click="emit('update:modelValue', !props.modelValue), playUncheck()"
    />
    <button
      v-else
      text="dark:slate200 dark:hover:primary-500 slate400 hover:primary-500"

      class="h7 w7 flex duration-500 active:scale-525"
      type="button"
      i-ph-circle-duotone
      @click="emit('update:modelValue', !props.modelValue), playCheck()"
    />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
