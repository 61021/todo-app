import type { OpUnitType } from 'dayjs'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { exampleTask } from '~/data'
import type { Status, Task } from '~/types/main'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([exampleTask])

  const todayTasks = computed(() => filterTasks('day'))
  const thisWeekTasks = computed(() => filterTasks('week'))
  const completedTasks = computed(() => filterStatus('done'))
  const trashedTasks = computed(() => filterStatus('trashed'))
  const wontDoTasks = computed(() => filterStatus('wontdo'))
  const sortedByDateTasks = computed(() => sortTasks('date'))
  const sortedByPriorityTasks = computed(() => sortTasks('priority'))

  function filterTasks(unit: OpUnitType) {
    return tasks.value.filter(task => dayjs(task.creationDate).isSame(dayjs(), unit) && !['trashed', 'wontdo'].includes(task.status))
  }

  function filterStatus(status: Status) {
    return tasks.value.filter(task => task.status === status)
  }

  function sortTasks(criteria: 'date' | 'priority') {
    return [...tasks.value].sort((a, b) => {
      if (criteria === 'date')
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      else if (criteria === 'priority')
        return b.priority - a.priority
      return 0
    })
  }

  function addTask(task: Task) {
    tasks.value.unshift(task)
  }

  function editTaskTitle(id: number, title: string) {
    const task = tasks.value.find(task => task.id === id)
    if (task)
      task.title = title
  }

  function toggleTaskStatus(id: number, status: Status) {
    const task = tasks.value.find(task => task.id === id)
    if (task)
      task.status = task.status === status ? 'todo' : status
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function toggleCompleteTask(id: number) {
    toggleTaskStatus(id, 'done')
  }

  function toggleTrashTask(id: number) {
    toggleTaskStatus(id, 'trashed')
  }

  function toggleWontDoTask(id: number) {
    toggleTaskStatus(id, 'wontdo')
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
