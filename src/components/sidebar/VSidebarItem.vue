<script setup lang="ts">
import type { NavItem } from './types'

const props = defineProps<{
  navItem: NavItem
  active: boolean
  isFull: boolean
  isCollapsed: boolean
}>()

const route = useRoute()

const { currentState } = useLayoutStore()

const isItemCollapsed = computed(() => {
  return props.isCollapsed
})
</script>

<template>
  <VFlexRow class="items-center justify-between">
    <RouterLink
      :to="navItem.path"
      class="relative"
      flex="~ items-center justify-between"
    >
      <div
        class="relative rounded-e-full"
        flex="~ items-center"
      >
        <div
          class="z1"
          flex="~ items-center justify-center"
          p="y2.5 x4"
        >
          <i
            :class="[
              navItem.icon?.active,
              active ? '' : 'opacity-0',
            ]"
            class="absolute z-2 duration-300"
            text="primary-500 2xl"
          />
          <i
            :class="[
              navItem.icon?.base,
              active ? 'opacity-0' : '',
            ]"
            text="slate500 dark:slate400 2xl"
            class="duration-300"
          />
        </div>

        <Transition name="slide-right">
          <span
            v-if="isFull"
            class="line-clamp-1 ms1"
            text="lg"
            :class="active ? 'text-primary' : 'text-slate-500 dark:text-slate-400'"
          >
            {{ t(navItem.title) }}
          </span>
        </Transition>
      </div>
    </RouterLink>
    <button
      v-if="navItem.children?.length! > 0"
      m="e4"
      class="duration-300"
      text="lg"
      i-ph-caret-down
      :class="isItemCollapsed ? 'text-slate-400' : 'rtl:rotate-90 -ltr:rotate-90 text-primary'"
      @click="emitter.emit('toggle', navItem)"
    />
  </VFlexRow>
  <VFlexCol
    v-if="navItem.children?.length! > 0
      && currentState === 'full'
      && !isItemCollapsed"
    :gap="2"
    class="relative"
    :ms="4"
  >
    <div
      class="absolute z1 hfull w-3px translate-y-1 rounded-full -translate-x-7"
      bg="dark:slate-700 slate-200"
    />

    <VSidebarSubItem
      v-for="item in navItem.children"
      :key="item.title"
      :is-collapsed="item.isCollapsed"
      class="ms-10"
      :nav-item="item"
      :is-full="isFull"
    />
  </VFlexCol>
</template>

<style scoped>
.draw-start-enter-active,
.draw-start-leave-active {
  transition: all 0.3s ease-in-out;
}
.draw-start-enter-from,
.draw-start-leave-to {
  transform: translateX(100%);
}
</style>
