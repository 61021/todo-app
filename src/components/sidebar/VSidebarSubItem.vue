<script setup lang="ts">
import type { NavItem } from './types'

const props = defineProps<{
  navItem: NavItem
  isFull: boolean
  isCollapsed?: boolean
  textSize?: string
}>()

const { currentState } = useLayoutStore()

const route = useRoute()

const active = computed(() => route.path === props.navItem.path)

const isItemCollapsed = computed(() => {
  return props.isCollapsed
})
</script>

<template>
  <VFlexRow class="items-center justify-between">
    <RouterLink
      :to="navItem.path"
      class="relative ms12 rounded-e-full"
      flex="~ items-center gap2"
    >
      <div
        v-if="navItem.icon"
        class="z1"
        flex="~ items-center justify-center"
      >
        <i
          :class="[
            navItem.icon?.active,
            active ? '' : 'opacity-0',
          ]"
          class="absolute z-2 duration-300"
          text="primary-500 lg"
        />
        <i
          :class="[
            navItem.icon?.base,
            active ? 'opacity-0' : '',
          ]"
          text="slate-400 lg"
          class="duration-300"
        />
      </div>

      <Transition name="slide-right">
        <span
          v-if="isFull"
          :class="[active ? 'text-primary' : 'text-slate-400', textSize]"
        >
          {{ t(navItem.title) }}
        </span>
      </Transition>
    </RouterLink>
    <button
      v-if="navItem?.children?.length > 0"
      m="e4 sauto"
      text="sm"
      class="duration-300"
      i-ph-caret-down
      :class="isItemCollapsed ? 'text-slate-400' : 'rtl:rotate-90 -ltr:rotate-90 text-primary'"
      @click="emitter.emit('toggle', navItem)"
    />
  </VFlexRow>
  <VFlexCol
    v-if="navItem?.children?.length > 0 && currentState === 'full' && !isItemCollapsed"
    :gap="2"
    :ms="6"
    class="relative"
  >
    <div
      class="absolute z1 h-95% w-3px translate-y-1 rounded-full -translate-x-6"
      bg="dark:slate-700 slate-200"
    />
    <VSidebarSubItem
      v-for="item in navItem.children"
      :key="item.title"
      text-size="text-base"
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
