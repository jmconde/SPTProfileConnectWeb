import { persisted } from 'svelte-local-storage-store';

export const todoList = persisted('pinBoard', {
  tasks: [],
  itemsNeeded: [],
});

export function addItemNeeded(item) {
  todoList.update((todo) => {
    if (todo.itemsNeeded.find((i) => i.id === item.id)) {
      return todo;
    }
    return { ...todo, itemsNeeded: [...todo.itemsNeeded, item] };
  });
}

export function removeItemNeeded(id) {
  todoList.update((todo) => {
    return { ...todo, itemsNeeded: todo.itemsNeeded.filter((i) => i.id !== id) };
  });
}

export function addTask(task) {
  todoList.update((todo) => {
    if (todo.tasks.find((t) => t.id === task.id)) {
      return todo;
    }
    return { ...todo, tasks: [...todo.tasks, task] };
  });
}

export function removeTask(id) {
  todoList.update((todo) => {
    return { ...todo, tasks: todo.tasks.filter((t) => t.id !== id) };
  });
}