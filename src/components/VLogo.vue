<script setup lang="ts">
const logo = ref<HTMLElement | null>(null)

function shake() {
  logo.value?.classList.add('shakeX')
  setTimeout(() => {
    logo.value?.classList.remove('shakeX')
  }, 500)
}

setInterval(shake, 10000)
</script>

<template>
  <img
    ref="logo"
    class="h8 w8 cursor-pointer"
    src="/favicon.svg"
    alt="Tree Todo Logo"
    @click="$router.push('/')"
  >
</template>

<style scoped>
.shakeX {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
