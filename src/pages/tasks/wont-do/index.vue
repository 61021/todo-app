<script setup lang="ts">
const { wontDoTasks } = storeToRefs(useTaskStore())
</script>

<template>
  <SingleListTaskView
    :tasks="wontDoTasks"
    title="Tasks I won't do"
  />
</template>
