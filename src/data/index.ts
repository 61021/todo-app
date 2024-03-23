import type { Task } from '~/types/main'

export const exampleTask: Task = {
  id: 1,
  title: 'Finish Qi Todo Task',
  description:
  `To-Do List Application

  Objective
  Create a simple To-Do list application where users can add, delete, and mark tasks as completed.
  Requirements
  The application should have an input field where users can type in new tasks.
  Users should be able to press "Enter" to add a task to the list.
  The application should work offline (Data must be stored locally).
  Each task should have a checkbox to mark it as completed.
  Completed tasks should be visually distinct from active tasks (e.g., strike-through text).
  Users should be able to delete tasks.
  The application should have a simple and clean user interface.
  Sort tasks by: (date, status, priority)
  Bonus
  Add the ability to edit tasks inline.
  Add keyboard control and shortcuts.
  Make the design responsive.
  Time Estimation
  Estimate the time it will take to complete the task and provide your estimate before your
  submission.

  Submission

  Submit your code along with a brief explanation of your implementation choices and any challenges
  faced.`,
  status: 'todo',
  creationDate: new Date().toISOString(),
}
