<script setup lang="ts">
import { navItems } from './routes'
import { useLayoutStore } from '~/common/stores/layout'
import type { Role } from '~/common/types'
import type { States } from '~/common/types/layout/states'

const { currentState, setState } = useLayoutStore()

const currentPath = useRoute()
function isCurrentRoute(path: string) {
  return currentPath.path.startsWith(path)
}

const isMobile = useMediaQuery('(max-width: 640px)')

watchImmediate(isMobile, (isMobile) => {
  if (isMobile)
    setState('hidden')

  else
    setState(localStorage.getItem('layout') as States || 'minimized')
})

const role = computed(() => localStorage.getItem('role') as Role)

onMounted(() => {
  emitter.emit('refresh:sideBarYards')
  emitter.emit('refresh:sideBarDispatches')
})
</script>

<template>
  <Transition name="slide-left">
    <aside
      v-if="currentState !== 'hidden'"
      :class="{
        'w-24': currentState === 'minimized',
        'w-72': currentState === 'full',
      }"
      class="absolute top-6 z-40 h-[calc(100vh-3rem)] overflow-x-hidden rounded-[1.25rem] py-4 duration-300 ltr:left-6 rtl:right-6"
      bg="white dark:slate-800"
      border="~ slate-200 dark:slate-700"
    >
      <div
        class="h-full w-full pb-4 duration-300"
        overflow="x-hidden y-auto"
        flex="~ col gap-2 "
        :class="{
          px4: currentState === 'minimized',
        }"
      >
        <header
          w-full
          flex="~ items-center"
          :class="{
            'justify-between px6': currentState === 'full',
            'justify-center': currentState === 'minimized',
          }"
        >
          <VLogo classes="h14! w14!" />

          <i
            v-if="currentState === 'full'"
            i-ph-magnifying-glass-duotone
            text="lg slate-400"
          />
        </header>

        <ul
          flex="~ col gap-2"
          py6
          :class="{
            ps2: currentState === 'full',
          }"
        >
          <li
            v-for="item in navItems.filter((item) => item.roles.includes(role))"
            :key="item.path"

            :class="{
              'justify-center': currentState === 'minimized',
            }"
          >
            <VSidebarItem
              :is-full="currentState === 'full'"
              :nav-item="item"
              :active="isCurrentRoute(item.path)"
              :is-collapsed="item.isCollapsed || false"
            />
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}
</style>
