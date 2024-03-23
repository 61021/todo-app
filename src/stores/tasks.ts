import type { Task } from '~/types/main'
import { exampleTask } from '~/data'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([
    exampleTask,
  ])

  function addTask(task: Task) {
    tasks.value.unshift(task)
  }

  function editTaskTitle(id: number, title: string) {
    const index = tasks.value.findIndex(task => task.id === id)

    if (index !== -1)
      tasks.value[index].title = title
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
    const storedTasks = localStorage.getItem('tasks') ?? JSON.stringify(tasks.value)

    tasks.value = JSON.parse(storedTasks)
  })

  watchDeep(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  })

  onKeyStroke('d', () => {
    localStorage.setItem('tasks', JSON.stringify([exampleTask]))
    tasks.value = [exampleTask]
  })

  return {
    tasks,
    addTask,
    deleteTask,
    editTaskTitle,
    trashTask,
    completeTask,
    unCompleteTask,

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
