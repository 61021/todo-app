<script setup lang="ts">
const routes = ref([
  {
    name: 'All',
    path: '/tasks/all',
    icon: {
      active: 'i-ph-stack-fill',
      inactive: 'i-ph-stack-duotone',
    },
  },
  {
    name: 'Today',
    path: '/tasks/today',
    icon: {
      active: 'i-ph-calendar-fill',
      inactive: 'i-ph-calendar-duotone',
    },
  },

])

const { tasks } = storeToRefs(useTaskStore())
</script>

<template>
  <aside
    flex="~"
    class="hscreen"
  >
    <VFlexCol
      bg="slate950"
      class="w14"
      p="y4"
      justify="between"
      items="center"
      pe="1"
    >
      <VFlexCol
        items="center"
        :gap="8"
      >
        <VLogo />

        <button i-ph-check-square-fill text="xl dark:white slate900" />
        <button i-ph-magnifying-glass-duotone text="xl dark:white slate900" />
      </VFlexCol>
      <VThemeSwitcher />
    </VFlexCol>

    <VFlexCol
      bg="slate950/50"
      class="w64"
      p="y4"
      justify="between"
      items="center"
      pe="1"
    >
      <VFlexCol
        class="wfull"
        :gap="2"
        p="x2"
      >
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="wfull rounded-full"
          p="x3 y2"
          :class="$route.path === route.path ? 'bg-slate800' : ''"
          flex="~ justify-between items-center"
        >
          <VFlexRow :gap="2">
            <i
              text="xl"
              :class="$route.path === route.path ? `text-white ${route.icon.active}` : `text-slate400 ${route.icon.inactive}`"
            />

            <span
              text="white slate900"
              v-text="route.name"
            />
          </VFlexRow>

          <span
            v-if="tasks.length !== 0"
            text="slate400"
            v-text="tasks.length"
          />
        </RouterLink>
      </VFlexCol>
    </VFlexCol>
  </aside>
</template>
