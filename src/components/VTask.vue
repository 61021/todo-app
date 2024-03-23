<script setup lang="ts">
import type { Task } from '~/types/main'

const props = defineProps<{
  task: Task
}>()

const theTask = ref(props.task)

const { completeTask, unCompleteTask, editTaskTitle } = useTaskStore()

function toggleTask(event: boolean) {
  if (event)
    completeTask(theTask.value.id)
  else
    unCompleteTask(theTask.value.id)
}

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
    bg="hover:slate700 slate800"
    class="group h12 rounded-full"
    px="4"
  >
    <VFlexRow
      items="center"
    >
      <VCheckbox
        :model-value="isDone"
        @update:model-value="(e:boolean) => toggleTask(e)"
      />
      <input
        text="slate900 dark:white"
        bg="transparent hover:slate800"
        class="h-full rounded-full px2 duration-300"
        outline="none active:none"
        :value="theTask.title"
        @input="(e: Event) => editTaskTitle(theTask.id, e?.target?.value ?? theTask.title)"
      >
    </VFlexRow>

    <VFlexRow>
      <i
        v-if="theTask.priority"
        i-ph-fire-duotone
        text="2xl"
        :class="priorityClasses[theTask.priority!]"
      />

      <button
        i-ph-dots-three-vertical
        class="opacity-0 duration-300 group-hover:opacity-100"
        text="2xl slate900 dark:slate200"
      />
    </VFlexRow>
  </VFlexRow>
</template>
