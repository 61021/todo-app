<script setup lang="ts">
const {
  tasks,
  todayTasks,
  thisWeekTasks,
  completedTasks,
  trashedTasks,
  wontDoTasks,
} = storeToRefs(useTaskStore())

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

function activeClasses(item: RouteItem): string {
  return currentRoute.path === item.path
    ? 'dark:text-white text-slate900'
    : 'dark:text-slate400 text-slate-400'
}

const firstThreeRoutes = computed(() => routes.value.slice(0, 3))
const lastThreeRoutes = computed(() => routes.value.slice(3))

const isSearchVisible = ref(false)

function toggleSearch(): void {
  isSearchVisible.value = !isSearchVisible.value
}

const { width } = useWindowSize()

const isMobile = computed(() => width.value < 768)

const isSidebarVisible = ref(true)

watchImmediate(isMobile, (val) => {
  if (val)
    isSidebarVisible.value = false
  else
    isSidebarVisible.value = true
})

const sidebar = ref<HTMLElement | null>(null)

onClickOutside(sidebar, () => {
  if (isMobile.value)
    isSidebarVisible.value = false
})

const { isSwiping, direction } = useSwipe(sidebar)

watch(isSwiping, (val) => {
  if (val)
    isSidebarVisible.value = direction.value === 'right'
})
</script>

<template>
  <Transition name="fade">
    <SearchMenu
      v-if="isSearchVisible"
      @exit="isSearchVisible = false"
    />
  </Transition>

  <button
    i-ph-list
    text="dark:white slate900 2xl"
    class="fixed left-4 top-4 z4 flex md:hidden"
    @click="isSidebarVisible = !isSidebarVisible"
  />
  <Transition name="slide">
    <aside
      v-if="isSidebarVisible"
      ref="sidebar"
      flex="~"
      class="fixed z4 hfull md:relative"
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

          <button
            i-ph-magnifying-glass-duotone
            text="xl dark:white slate900 hover:primary500"
            class="duration-300"
            @click="toggleSearch()"
          />
        </VFlexCol>
        <VThemeSwitcher />
      </VFlexCol>

      <VFlexCol
        bg="dark:#080e21 slate100"
        class="w64 md:w72"
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
            class="wfull rounded-xl duration-300"
            bg="dark:hover:slate-900 hover:slate-200"
            p="x3 y2"
            :class="$route.path === route.path ? 'dark:bg-slate800 bg-slate300' : ''"
            flex="~ justify-between items-center"
          >
            <VFlexRow :gap="2">
              <i
                text="xl"
                :class="[
                  currentRoute.path === route.path ? route.icon.active : route.icon.inactive,
                  activeClasses(route),
                ]"
                class="duration-300"
              />

              <span
                :class="activeClasses(route)"
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
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
