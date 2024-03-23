<script setup lang="ts">
const { thisWeekTasks } = storeToRefs(useTaskStore())
</script>

<template>
  <TaskView :tasks="thisWeekTasks" />
</template>
