import { persisted } from 'svelte-local-storage-store';

export const todoList = persisted('x-pinboard', []);

export function clearTodoList() {
  todoList.set([]);
}

  /* [
   *   {
   *     id: <quest_id>,
   *     name: <quest_name>,
   *     timestamp: <timestamp>,
   *     tasks: [],
   *     itemsNeeded: [],
   *   },
   * ]
   **/
export function addItemNeeded(newItem) {
  todoList.update((todo) => {
    const quest = _getQuestData(todo, newItem.quest);
    const itemNeeded = quest.itemsNeeded.find((item) => item.id === newItem.id);
    if (!itemNeeded) {      
      quest.itemsNeeded.push({ ...newItem, timestamp: new Date().getTime() });
    }
    return todo;
  });
}

export function removeItemNeeded(item) {
  todoList.update((todo) => {
    const quest = _getQuestData(todo, item.quest);
    quest.itemsNeeded = quest.itemsNeeded.filter((t) => t.id !== item.id);
    return checkEmptyQuest(todo, quest);
  });
}

export function addTask(newTask) {
  todoList.update((todo) => {
    const quest = _getQuestData(todo, newTask.quest);
    const task = quest.tasks.find((t) => t.id === newTask.id);
    if (!task) {      
      quest.tasks.push({ ...newTask, timestamp: new Date().getTime() });
    }
    return todo;
  });
}

function checkEmptyQuest(todo, quest) {
  if (quest.tasks.length === 0 && quest.itemsNeeded.length === 0) {
    return todo.filter((t) => t.id !== quest.id);
  }
  return todo;
}

function _getQuestData(todo, quest) {
  let questIndex  = todo.findIndex((t) => t.id === quest.id);
  if (questIndex === -1) {
    todo.push({
      id: quest.id,
      name: quest.name,
      location: quest.location,
      timestamp: new Date().getTime(),
      tasks: [],
      itemsNeeded: [],
    });
    questIndex = todo.length - 1;     
  }
  return todo[questIndex];
}

export function removeTask(task) {
  todoList.update((todo) => {
    const quest = _getQuestData(todo, task.quest);
    quest.tasks = quest.tasks.filter((t) => t.id !== task.id);
    return checkEmptyQuest(todo, quest);
  });
}

export function toggleCollapse(id) {
  todoList.update((todo) => {
    const quest = _getQuestData(todo, id);
    quest._collapsed = !quest._collapsed;
    return todo;
  });
}