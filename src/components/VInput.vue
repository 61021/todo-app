<script setup lang="ts">
const model = defineModel<string>()

const { addTask } = useTaskStore()

const { tasks } = storeToRefs(useTaskStore())

function generateId() {
  return Math.max(...tasks.value.map(task => task.id)) + 1 ?? 1
}

function handleEnter() {
  if (model?.value?.trim() === '')
    return

  addTask({
    id: generateId(),
    title: model.value!,
    priority: null,
    status: 'todo',
  })
  model.value = ''
}
</script>

<template>
  <input
    id="input"
    v-model="model"
    type="text"
    v-bind="$attrs"
    border="~ rounded-full slate200 dark:slate700 focus:emerald500"
    class="h11 w100 overflow-hidden"
    p="x4 y2"
    bg="dark:slate800 white"
    autofocus
    text="dark:white slate900 placeholder:sm placeholder:slate400"
    placeholder="Add a task..."
    outline="none active:none"
    @keyup.enter="() => handleEnter()"
  >
</template>
