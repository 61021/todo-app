<script setup lang="ts">
const { completedTasks } = storeToRefs(useTaskStore())
</script>

<template>
  <SingleListTaskView
    :tasks="completedTasks"
    title="Completed Tasks"
  />
</template>
