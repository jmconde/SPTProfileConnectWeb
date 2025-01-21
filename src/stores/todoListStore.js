import { writable } from 'svelte/store';

export const todoList = writable([]);

export function addTask(task) {
  todoList.update((todo) => {
    if (todo.find((t) => t.id === task.id)) {
      return todo;
    }
    return [...todo, task];
  });
}

export function removeTask(id) {
  todoList.update((todo) => {
    return todo.filter((task) => task.id !== id);
  });
}