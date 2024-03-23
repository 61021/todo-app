<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import switchSound from '~/assets/sounds/switch.mp3'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { play } = useSound(switchSound)
</script>

<template>
  <button flex @click="toggleDark(), play()">
    <Transition
      name="slide"
      mode="out-in"
    >
      <i
        v-if="isDark"
        i-ph-moon-stars-duotone
        text="primary500 xl"
      />
      <i
        v-else
        i-ph-sun-duotone
        text="yellow500 xl"
      />
    </Transition>
  </button>
</template>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: all 100ms ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
