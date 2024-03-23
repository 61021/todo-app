<template>
  <div
    flex="~ col gap-2 items-center justify-center"
  >
    <i
      class="dancing i-ph-question-duotone"
      text="slate-400 dark:slate-500  4xl"
    />
    <p
      text="slate-400 dark:slate-500 "
    >
      There are no tasks to show
    </p>
  </div>
</template>

<style scoped>
.dancing {
  animation: dancing 1s ease-in-out infinite alternate-reverse;
}

@keyframes dancing {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-20deg);
  }
}
</style>
