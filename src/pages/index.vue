<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const { tasks } = storeToRefs(useMainStore())
</script>

<template>
  <VFlexCol
    class="h-screen py16"
    items="center"
  >
    <VFlexCol gap="8">
      <VInput />

      <VFlexCol gap="2">
        <h2
          text="dark:white slate900"
          font-bold
          v-text="'Todo:'"
        />
        <div
          id="tasks"
          flex="~ col gap4"
        >
          <VTask
            v-for="task in tasks"
            :key="task.id"
            :task="task"
          />
        </div>
      </VFlexCol>
    </VFlexCol>
  </VFlexCol>
</template>
