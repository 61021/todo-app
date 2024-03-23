<script setup lang="ts">
import type { Priority } from '~/types/main'

const model = defineModel<string>()
const { addTask } = useTaskStore()
const { tasks } = storeToRefs(useTaskStore())

const nextId = computed(() => {
  const maxId = Math.max(...tasks.value.map(task => task.id))
  return maxId >= 0 ? maxId + 1 : 1
})

const priority = ref<Priority>(0)

const priorityClasses = ref({
  0: 'text-slate400',
  1: 'text-emerald-500',
  2: 'text-yellow-500',
  3: 'text-rose-500',
})

function togglePriority() {
  priority.value = (priority.value >= 3) ? 0 : priority.value + 1 as Priority
}

function handleEnter() {
  const trimmedModel = model.value?.trim()
  if (!trimmedModel)
    return

  addTask({
    id: nextId.value,
    title: trimmedModel,
    priority: priority.value,
    status: 'todo',
    creationDate: new Date().toISOString(),
  })
  model.value = ''
  priority.value = 0
}

const input = ref<HTMLInputElement | null>(null)

onStartTyping(() => {
  if (input.value)
    input.value.focus()
})
</script>

<template>
  <VFlexRow
    p="x4"
    bg="dark:slate800 slate200"
    border="rounded-full"
    items="center wfull"
    class="group wfull min-h-12 max-h-12"
  >
    <input
      ref="input"
      v-model="model"
      type="text"
      v-bind="$attrs"
      class="wfull overflow-hidden"
      autofocus
      text="dark:white slate900 placeholder:slate500"
      placeholder="+ Add a task..."
      bg="transparent"
      outline="none active:none"
      @keyup.enter="() => handleEnter()"
    >

    <VFlexRow
      :gap="2"
      :class="isEmpty(model?.trim()) ? 'opacity-0' : 'opacity-100'"
      class="duration-300"
    >
      <i
        i-ph-fire-duotone
        class="cursor-pointer duration-300"
        :class="priorityClasses[priority]"
        text="2xl"
        @click="togglePriority"
      />
      <button
        i-ph-plus-circle
        class="duration-300"
        text="2xl slate400 hover:primary-500"
        @click="handleEnter"
      />
    </VFlexRow>
  </VFlexRow>
</template>
