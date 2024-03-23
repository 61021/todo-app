<script setup lang="ts">
import type { Task } from '~/types/main'

defineProps<{
  title: string
  tasks: Task[]
}>()
</script>

<template>
  <VFlexCol
    class="hfull wfull overflow-hidden overflow-y-auto py16"
    items="center"
    :gap="8"
  >
    <VFlexCol
      class="relative hfull wfull"
      :gap="4"
    >
      <span
        class="font-bold capitalize"
        text="slate900 dark:white"
        v-text="title"
      />
      <TransitionGroup
        name="tasks"
        tag="ul"
        class="relative hfull wfull space-y-4"
      >
        <VTask
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        />
      </TransitionGroup>
    </VFlexCol>
  </VFlexCol>
</template>

<style scoped>
.tasks-move,
.tasks-enter-active,
.tasks-leave-active {
  transition: all 0.5s ease;
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>
