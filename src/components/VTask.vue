<script setup lang="ts">
import dayjs from 'dayjs'
import type { Task } from '~/types/main'

const props = defineProps<{
  task: Task
  isDone?: boolean
}>()

const {
  toggleCompleteTask,
  editTaskTitle,
  toggleTrashTask,
  toggleWontDoTask,
  deleteTask,
} = useTaskStore()

const priorityClasses = {
  1: 'text-emerald500',
  2: 'text-amber500',
  3: 'text-red500',
}

const isDone = computed(() => props.task.status === 'done')
</script>

<template>
  <VFlexRow
    items="center"
    justify="between"
    bg="dark:hover:slate700 dark:slate800 slate200 hover:slate100"
    class="group h12 rounded-full"
    px="4"
    :gap="2"
    :class="isDone ? 'opacity70' : ''"
  >
    <VFlexRow
      items="center"
      :gap="1"
      class="wfull"
    >
      <VCheckbox
        v-if="
          task.status !== 'wontdo'
            && task.status !== 'trashed'
        "

        :model-value="isDone"
        @update:model-value="() => toggleCompleteTask(task.id)"
      />
      <button
        v-else-if="task.status === 'wontdo'"
        text="dark:slate200 dark:hover:primary-500 slate400 hover:primary-500"

        class="h7 w7 flex duration-500 active:scale-125"
        type="button"
        i-ph-x-circle-duotone
        @click="toggleWontDoTask(task.id)"
      />
      <button
        v-else-if="task.status === 'trashed'"
        text="dark:slate200 dark:hover:primary-500 slate400 hover:primary-500"

        class="h7 w7 flex duration-500 active:scale-125"
        type="button"
        i-ph-arrow-clockwise-duotone
        @click="toggleTrashTask(task.id)"
      />

      <input
        text="slate900 dark:white"
        bg="transparent dark:hover:slate800 hover:slate200 "
        class="h-full wfull rounded-xl duration-300"
        p="x2 y1"
        outline="none active:none"
        :class="isDone ? 'line-through' : 'no-underline'"
        :value="task.title"
        @input="(e: Event) => editTaskTitle(task.id, e?.target?.value ?? task.title)"
      >
    </VFlexRow>

    <VFlexRow :gap="2" items="center">
      <span
        text="xs slate400 "
        class="min-w-max duration-300 group-hover:opacity-100 md:opacity-0"
        v-text="dayjs(task.creationDate).format('HH:mm A - YYYY/MM/DD')"
      />

      <button
        v-if="task.status !== 'wontdo' && task.status !== 'trashed'"
        i-ph-x-circle-duotone
        class="duration-300 group-hover:opacity-100 md:opacity-0"
        text="xl slate500 dark:slate400 hover:yellow500 dark:hover:yellow500"
        @click="toggleWontDoTask(task.id)"
      />
      <button
        v-if="task.status !== 'trashed'"
        i-ph-trash-duotone
        class="duration-300 group-hover:opacity-100 md:opacity-0"
        text="xl slate500 dark:slate400 hover:red500 dark:hover:red500"
        @click="toggleTrashTask(task.id)"
      />

      <button
        v-if="task.status === 'trashed'"
        i-ph-trash-duotone
        class="duration-300 group-hover:opacity-100 md:opacity-0"
        text="xl slate500 dark:slate400 hover:red-500 dark:hover:red-500"
        @click="deleteTask(task.id)"
      />

      <i
        v-if="task.priority"
        i-ph-fire-duotone
        text="2xl"
        :class="priorityClasses[task.priority!]"
      />
    </VFlexRow>
  </VFlexRow>
</template>
