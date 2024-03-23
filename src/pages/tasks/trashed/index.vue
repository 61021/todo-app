<script setup lang="ts">
const { trashedTasks } = storeToRefs(useTaskStore())
</script>

<template>
  <SingleListTaskView
    :tasks="trashedTasks"
    title="Trashed Tasks"
  />
</template>
