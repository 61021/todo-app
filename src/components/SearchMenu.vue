<script setup lang="ts">
const emit = defineEmits(['exit'])

const query = ref('')

const router = useRouter()

function search() {
  router.push(`/tasks/all?q=${query.value}`)
  emit('exit')
}

const container = ref<HTMLElement | null>(null)
onClickOutside(container, () => {
  router.push('/tasks/all')
  emit('exit')
})

const input = ref<HTMLInputElement | null>(null)
onMounted(() => {
  if (input.value)
    input.value.focus()
})
</script>

<template>
  <div
    class="fixed left-0 top-0 z10 hscreen wfull backdrop-blur-2px"
    bg="slate900/10"
    flex="~ items-center justify-center"
  >
    <VFlexCol
      ref="container"
      class="rounded-full"
      bg="dark:slate800"
      p="y2 x4"
      border="~ dark:slate700"
    >
      <VFlexRow :gap="2">
        <button
          i-ph-magnifying-glass-duotone text="xl dark:white slate900"
          @click="search()"
        />
        <input
          ref="input"
          v-model="query"
          autofocus
          text="dark:white slate900"
          outline="none focus:none"
          type="text"
          bg="transparent"
          @keyup.enter="search()"
        >
      </VFlexRow>
    </VFlexCol>
  </div>
</template>
