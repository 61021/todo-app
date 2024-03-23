<script setup lang="ts">
import type { Task } from '~/types/main'

const props = defineProps<{
  task: Task
  isDone?: boolean
}>()

const theTask = ref(props.task)

const { toggleCompleteTask, editTaskTitle, toggleTrashTask, toggleWontDoTask, deleteTask } = useTaskStore()

const priorityClasses = {
  low: 'text-emerald500',
  medium: 'text-amber500',
  high: 'text-red500',
}

const isDone = computed(() => theTask.value.status === 'done')
</script>

<template>
  <VFlexRow
    items="center"
    justify="between"
    bg="dark:hover:slate700 dark:slate800 slate200 hover:slate100"
    class="group h12 rounded-full"
    px="4"
    :gap="1"
    :class="isDone ? 'opacity70' : ''"
  >
    <VFlexRow
      items="center"
      :gap="1"
      class="wfull"
    >
      <VCheckbox
        v-if="
          theTask.status !== 'wontdo'
            && theTask.status !== 'trashed'
        "

        :model-value="isDone"
        @update:model-value="() => toggleCompleteTask(theTask.id)"
      />
      <button
        v-else-if="theTask.status === 'wontdo'"
        text="dark:slate200 dark:hover:primary-500 slate400 hover:primary-500"

        class="h7 w7 flex duration-500 active:scale-125"
        type="button"
        i-ph-x-circle-duotone
        @click="toggleWontDoTask(theTask.id)"
      />
      <button
        v-else-if="theTask.status === 'trashed'"
        text="dark:slate200 dark:hover:primary-500 slate400 hover:primary-500"

        class="h7 w7 flex duration-500 active:scale-125"
        type="button"
        i-ph-arrow-clockwise-duotone
        @click="toggleTrashTask(theTask.id)"
      />

      <input
        text="slate900 dark:white"
        bg="transparent dark:hover:slate800 hover:slate300 "
        class="h-full wfull rounded-full duration-300"
        p="x2 y1"
        outline="none active:none"
        :class="isDone ? 'line-through' : 'no-underline'"
        :value="theTask.title"
        @input="(e: Event) => editTaskTitle(theTask.id, e?.target?.value ?? theTask.title)"
      >
    </VFlexRow>

    <VFlexRow :gap="2">
      <i
        v-if="theTask.priority"
        i-ph-fire-duotone
        text="2xl"
        :class="priorityClasses[theTask.priority!]"
      />

      <button
        v-if="theTask.status !== 'wontdo' && theTask.status !== 'trashed'"
        i-ph-x-circle-duotone
        class="md:opacity-0 duration-300 group-hover:opacity-100"
        text="xl slate500 dark:slate400 hover:yellow500 dark:hover:yellow500"
        @click="toggleWontDoTask(theTask.id)"
      />
      <button
        v-if="theTask.status !== 'trashed'"
        i-ph-trash-duotone
        class="md:opacity-0 duration-300 group-hover:opacity-100"
        text="xl slate500 dark:slate400 hover:red500 dark:hover:red500"
        @click="toggleTrashTask(theTask.id)"
      />

      <button
        v-if="theTask.status === 'trashed'"
        i-ph-trash-duotone
        class="md:opacity-0 duration-300 group-hover:opacity-100"
        text="xl slate500 dark:slate400 hover:red-500 dark:hover:red-500"
        @click="deleteTask(theTask.id)"
      />
    </VFlexRow>
  </VFlexRow>
</template>
