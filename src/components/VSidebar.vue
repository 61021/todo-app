<script setup lang="ts">
const { tasks, todayTasks, thisWeekTasks, completedTasks, trashedTasks, wontDoTasks } = storeToRefs(useTaskStore())

interface RouteItem {
  name: string
  path: string
  icon: {
    active: string
    inactive: string
  }
  count: ComputedRef<number>
}
const routes = ref<RouteItem[]>([
  {
    name: 'All',
    path: '/tasks/all',
    icon: {
      active: 'i-ph-stack-fill',
      inactive: 'i-ph-stack-duotone',
    },
    count: computed(() => tasks.value.filter(task => task.status !== 'trashed' && task.status !== 'wontdo').length),
  },
  {
    name: 'Today',
    path: '/tasks/today',
    icon: {
      active: 'i-ph-calendar-fill',
      inactive: 'i-ph-calendar-duotone',
    },
    count: computed(() => todayTasks.value.length),
  },
  {
    name: 'This Week',
    path: '/tasks/this-week',
    icon: {
      active: 'i-ph-calendar-blank-fill',
      inactive: 'i-ph-calendar-blank-duotone',
    },
    count: computed(() => thisWeekTasks.value.length),
  },
  {
    name: 'Completed',
    path: '/tasks/completed',
    icon: {
      active: 'i-ph-check-circle-fill',
      inactive: 'i-ph-check-circle-duotone',
    },
    count: computed(() => completedTasks.value.length),
  },
  {
    name: 'Trash',
    path: '/tasks/trashed',
    icon: {
      active: 'i-ph-trash-fill',
      inactive: 'i-ph-trash-duotone',
    },
    count: computed(() => trashedTasks.value.length),
  },
  {
    name: 'Won\'t Do',
    path: '/tasks/wont-do',
    icon: {
      active: 'i-ph-x-circle-fill',
      inactive: 'i-ph-x-circle-duotone',
    },
    count: computed(() => wontDoTasks.value.length),
  },
])
const currentRoute = useRoute()

function iconActiveClasses(item: RouteItem) {
  return currentRoute.path === item.path
    ? `dark:text-white text-slate900 ${item.icon.active}`
    : `dark:text-slate400 text-slate-400 ${item.icon.inactive}`
}

function textActiveClasses(item: RouteItem) {
  return currentRoute.path === item.path
    ? 'dark:text-white text-slate900'
    : 'dark:text-slate400 text-slate-400'
}

const firstThreeRoutes = computed(() => routes.value.slice(0, 3))
const lastThreeRoutes = computed(() => routes.value.slice(3))

const isSearchVisible = ref(false)
function toggleSearch() {
  isSearchVisible.value = !isSearchVisible.value
}
</script>

<template>
  <SearchMenu
    v-if="isSearchVisible"
    @exit="isSearchVisible = false"
  />
  <aside
    flex="~"
    class="full"
  >
    <VFlexCol
      bg="dark:slate950 slate200"
      class="w14"
      p="y4"
      justify="between"
      items="center"
      pe="1"
      border="e dark:slate900 slate300"
    >
      <VFlexCol
        items="center"
        :gap="8"
      >
        <VLogo />

        <button i-ph-check-square-fill text="xl dark:white slate900" />
        <button
          i-ph-magnifying-glass-duotone text="xl dark:white slate900"
          @click="toggleSearch"
        />
      </VFlexCol>
      <VThemeSwitcher />
    </VFlexCol>

    <VFlexCol
      bg="dark:slate950/50 slate100"
      class="w72"
      p="y4"
      justify="between"
      items="center"
      px="2"
      border="e dark:slate800 slate200"
    >
      <VFlexCol
        v-for="(routesList, index) in [firstThreeRoutes, lastThreeRoutes]"
        :key="index"
        class="wfull"
        :gap="2"
        p="x2"
      >
        <RouterLink
          v-for="route in routesList"
          :key="route.path"
          :to="route.path"
          class="wfull rounded-full duration-300"
          p="x4 y2"
          :class="$route.path === route.path ? 'dark:bg-slate800 bg-slate300' : ''"
          flex="~ justify-between items-center"
        >
          <VFlexRow :gap="2">
            <i
              text="xl"
              :class="iconActiveClasses(route)"
              class="duration-300"
            />

            <span
              :class="textActiveClasses(route)"
              text="dark:white darkslate900"
              class="duration-300"
              v-text="route.name"
            />
          </VFlexRow>

          <span
            v-if="tasks.length !== 0"
            text="dark:slate500 slate400 xs"
            v-text="route.count"
          />
        </RouterLink>
      </VFlexCol>
    </VFlexCol>
  </aside>
</template>
