<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

onMounted(() => {
  router.push('/tasks/all')
})
</script>

<template>
</template>
