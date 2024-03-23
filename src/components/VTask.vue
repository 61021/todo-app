<script setup lang="ts">
import type { Task } from '~/types/main'

const props = defineProps<{
  task: Task
}>()

const theTask = ref(props.task)

const { completeTask, unCompleteTask } = useMainStore()

function toggleTask(event: boolean) {
  if (!event)
    completeTask(theTask.value.id)
  else
    unCompleteTask(theTask.value.id)
}

const priorityClasses = {
  low: 'text-emerald500',
  medium: 'text-amber500',
  high: 'text-red500',

}
</script>

<template>
  <VFlexRow
    items="center"
    justify="between"
  >
    <VFlexRow
      items="center"
      :gap="2"
    >
      <VCheckbox @update:model-value="(e:boolean) => toggleTask(e)" />
      <span
        text="slate900 dark:white"
        v-text="theTask.title"
      />
    </VFlexRow>

    <i
      v-if="theTask.priority"
      i-ph-fire-duotone
      text="2xl"
      :class="priorityClasses[theTask.priority!]"
    />
  </VFlexRow>
</template>
