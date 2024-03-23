import dayjs from 'dayjs'
import type { Task } from '~/types/main'
import { exampleTask } from '~/data'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([
    exampleTask,
  ])

  const todayTasks = computed(() => tasks.value.filter(task => dayjs(task.creationDate).isSame(dayjs(), 'day') && task.status !== 'trashed' && task.status !== 'wontdo'))
  const thisWeekTasks = computed(() => tasks.value.filter(task => dayjs(task.creationDate).isSame(dayjs(), 'week') && task.status !== 'trashed' && task.status !== 'wontdo'))
  const completedTasks = computed(() => tasks.value.filter(task => task.status === 'done'))
  const trashedTasks = computed(() => tasks.value.filter(task => task.status === 'trashed'))
  const wontDoTasks = computed(() => tasks.value.filter(task => task.status === 'wontdo'))
  const sortedByDateTasks = computed(() => tasks.value.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()))
  const sortedByPriorityTasks = computed(() => tasks.value.sort((a, b) => b.priority - a.priority))

  function addTask(task: Task) {
    tasks.value.unshift(task)
  }

  function editTaskTitle(id: number, title: string) {
    const index = tasks.value.findIndex(task => task.id === id)

    if (index !== -1)
      tasks.value[index].title = title
  }

  function toggleTrashTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = task.status === 'trashed' ? 'todo' : 'trashed'
  }

  function toggleWontDoTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = task.status === 'wontdo' ? 'todo' : 'wontdo'
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function toggleCompleteTask(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (task)
      task.status = task.status === 'done' ? 'todo' : 'done'
  }

  onMounted(() => {
    const storedTasks = localStorage.getItem('tasks') ?? JSON.stringify(tasks.value)

    tasks.value = JSON.parse(storedTasks)
  })

  watchDeep(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  })

  return {
    tasks,
    todayTasks,
    thisWeekTasks,
    completedTasks,
    trashedTasks,
    wontDoTasks,

    sortedByDateTasks,
    sortedByPriorityTasks,

    addTask,
    deleteTask,
    editTaskTitle,
    toggleCompleteTask,
    toggleTrashTask,
    toggleWontDoTask,

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
