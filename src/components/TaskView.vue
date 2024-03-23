<script setup lang="ts">
import type { Task } from '~/types/main'

const props = defineProps<{
  tasks: Task[]
}>()

const computedClone = computed(() => JSON.parse(JSON.stringify(props.tasks)) as Task[])

const sortedByDesDateTasks = computed(() => sortByDate(computedClone.value, true))
const sortedByAscDateTasks = computed(() => sortByDate(computedClone.value, false))
const sortedByDesPriorityTasks = computed(() => sortByPriority(computedClone.value, true))
const sortedByAscPriorityTasks = computed(() => sortByPriority(computedClone.value, false))

const sortedBy = ref<'date' | 'priority'>('date')
const isDescending = ref(false)

const lists = computed(() => getGroupedTasks())

const route = useRoute()
const isQuery = computed(() => !!route.query.q)

function sortByDate(tasks: Task[], descending: boolean): Task[] {
  return tasks.slice().sort((a, b) =>
    (descending
      ? new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      : new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()),
  )
}

function sortByPriority(tasks: Task[], descending: boolean): Task[] {
  return tasks.slice().sort((a, b) =>
    (descending ? b.priority - a.priority : a.priority - b.priority),
  )
}

function getGroupedTasks(): { title: 'todo' | 'done', tasks: Task[] }[] {
  const sortedTasks = sortedBy.value === 'date'
    ? (isDescending.value ? sortedByDesDateTasks.value : sortedByAscDateTasks.value)
    : (isDescending.value ? sortedByDesPriorityTasks.value : sortedByAscPriorityTasks.value)

  const todoTasks = sortedTasks.filter(task => task.status === 'todo')
  const doneTasks = sortedTasks.filter(task => task.status === 'done')

  return [
    { title: 'todo', tasks: todoTasks },
    { title: 'done', tasks: doneTasks },
  ]
}
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

    <VFlexRow
      :gap="3"
      items="center"
      justify="end"
    >
      <button
        class="cursor-pointer rounded-full duration-300"
        :bg="sortedBy === 'date' ? 'primary' : 'slate300 hover:slate200 dark:slate800 dark:hover:slate700'"
        p="x4 y2"
        gap="1"
        items="center"
        text="slate800 dark:white"
        @click="sortedBy = 'date'"
        v-text="'Date'"
      />
      <button
        class="cursor-pointer rounded-full duration-300"
        :bg="sortedBy === 'priority' ? 'primary' : 'slate300 hover:slate200 dark:slate800 dark:hover:slate700'"
        p="x4 y2"
        gap="1"
        items="center"
        text="slate800 dark:white"
        @click="sortedBy = 'priority'"
        v-text="'Priority'"
      />
      <button
        i-ph-caret-down
        text="slate900 dark:white"
        class="text-lg duration-300"
        :class="isDescending ? '' : 'rotate-180'"
        @click="isDescending = !isDescending"
      />
    </VFlexRow>
    <VFlexCol
      v-if="lists.some(list => list.tasks.length > 0)"
      class="hfull wfull overflow-hidden overflow-y-auto"
      :gap="8"
    >
      <VFlexCol
        v-for="list in lists.filter(list => list.tasks.length > 0)"
        :key="list.title"
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
  transition: all 0.3s ease;
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>
