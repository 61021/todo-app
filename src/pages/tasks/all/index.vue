<script setup lang="ts">
import type { Task } from '~/types/main'

const { tasks } = storeToRefs(useTaskStore())

const todoTasks = computed(() => tasks.value
  .filter(task => task.status === 'todo')
  .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()))

const doneTasks = computed(() => tasks.value
  .filter(task => task.status === 'done')
  .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()))

const currentTab = ref<'todo' | 'done'>('todo')

const lists = computed<{
  title: 'todo' | 'done'
  tasks: Task[]
}[]>
(() => [
  { title: 'todo', tasks: todoTasks.value },
  { title: 'done', tasks: doneTasks.value },
])
</script>

<template>
  <VFlexCol
    class="hfull w50vw py16"
    items="center"
    :gap="8"
  >
    <VInput />

    <VFlexCol
      v-for="list in lists"
      :key="list.title"
      class="relative hfull wfull"
      :gap="2"
    >
      <TransitionGroup
        v-if="currentTab === list.title"
        name="tasks"
        tag="ul"
        class="relative hfull wfull overflow-hidden overflow-y-auto space-y-4"
      >
        <VTask
          v-for="task in list.tasks"
          :key="task.id"
          :task="task"
        />
      </TransitionGroup>
      <div
        class="pointer-events-none absolute bottom-0 h20 wfull from-slate900 to-transparent bg-gradient-to-t"
      />
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

.tasks-leave-active {
  position: absolute;
}
</style>
