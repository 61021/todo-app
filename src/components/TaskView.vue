<script setup lang="ts">
import type { Task } from '~/types/main'

const props = defineProps<{
  tasks: Task[]
}>()

const todoTasks = computed(() => props.tasks
  .filter(task => task.status === 'todo')
  .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()))

const doneTasks = computed(() => props.tasks
  .filter(task => task.status === 'done')
  .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()))

const lists = computed<{
  title: 'todo' | 'done'
  tasks: Task[]
}[]>
(() => [
  { title: 'todo', tasks: todoTasks.value },
  { title: 'done', tasks: doneTasks.value },
])

const route = useRoute()
const isQuery = computed(() => route.query.q as string | undefined)
</script>

<template>
  <VFlexCol
    class="hfull wfull py16"
    :gap="8"
  >
    <RouterLink
      v-if="isQuery"
      to="/tasks/all"
      class="absolute left-8 top-4 text-slate900 dark:text-white"
      flex="~ gap-1 items-center"
    >
      <i
        i-ph-caret-left-duotone
        text="slate900 dark:white"
      />
      Back
    </RouterLink>
    <VInput />

    <VFlexCol
      v-if="lists.some(list => list.tasks.length > 0)"
      class="hfull wfull overflow-hidden overflow-y-auto"
      items="center"
      :gap="8"
    >
      <VFlexCol
        v-for="list in lists.filter(list => list.tasks.length > 0)"
        :key="list.title"
        class="relative hfull wfull"
        :gap="4"
      >
        <span
          class="font-bold capitalize"
          text="slate900 dark:white"
          v-text="list.title"
        />
        <TransitionGroup
          name="tasks"
          tag="ul"
          class="relative hfull wfull space-y-4"
        >
          <VTask
            v-for="task in list.tasks"
            :key="task.id"
            :is-done="list.title === 'done'"
            :task="task"
          />
        </TransitionGroup>
      </VFlexCol>
    </VFlexCol>
    <VNoData v-else />
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
