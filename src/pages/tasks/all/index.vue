<script setup lang="ts">
const { tasks } = storeToRefs(useTaskStore())
</script>

<template>
  <TaskView :tasks="tasks.filter((task) => task.status !== 'trashed' && task.status !== 'wontdo')" />
</template>
