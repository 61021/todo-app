<script setup lang="ts">
const model = defineModel<string>()

const { addTask } = useTaskStore()

const { tasks } = storeToRefs(useTaskStore())

const nextId = computed(() => Math.max(...tasks.value.map(task => task.id)) + 1 ?? 1)

function handleEnter() {
  if (model?.value?.trim() === '')
    return

  addTask({
    id: nextId.value,
    title: model.value!,
    priority: null,
    status: 'todo',
    creationDate: new Date().toISOString(),
  })
  model.value = ''
}
</script>

<template>
  <VFlexRow
    p="x4"
    bg="dark:slate800 white"
    border="rounded-full"
    items="center wfull"
    class="group h12 wfull"
  >
    <input
      id="input"
      v-model="model"
      type="text"
      v-bind="$attrs"
      class="wfull overflow-hidden"
      autofocus
      text="dark:white slate900 placeholder:sm placeholder:slate400"
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
      <button
        i-ph-dots-three-circle
        class="duration-300"
        text="2xl slate400 hover:primary-500"
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
