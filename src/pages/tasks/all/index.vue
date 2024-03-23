<script setup lang="ts">
const { tasks } = storeToRefs(useTaskStore())

const route = useRoute()

const q = computed(() => route.query.q as string | undefined)

const filteredTasks = computed(() => {
  if (q.value)
    return tasks.value.filter(task => task.title.toLowerCase().includes(q.value.toLowerCase()))

  return tasks.value
})
</script>

<template>
  <TaskView :tasks="filteredTasks.filter((task) => task.status !== 'trashed' && task.status !== 'wontdo')" />
</template>
