import type { Task } from '~/types/main'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

  function addTask(task: Task) {
    tasks.value.push(task)
  }

  function trashTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = 'trashed'
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function completeTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = 'done'
  }

  function unCompleteTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = 'todo'
  }

  onMounted(() => {
    const storedTasks = localStorage.getItem('tasks') ?? '[]'

    tasks.value = JSON.parse(storedTasks)
  })

  watchDeep(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  })

  return {
    tasks,
    addTask,
    deleteTask,
    trashTask,
    completeTask,
    unCompleteTask,

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
