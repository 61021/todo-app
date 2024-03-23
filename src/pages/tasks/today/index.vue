<script setup lang="ts">
const { todayTasks } = storeToRefs(useTaskStore())
</script>

<template>
  <TaskView :tasks="todayTasks" />
</template>
