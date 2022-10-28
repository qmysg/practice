//本地储存的键名
const TODO_TASK = "task";

/**
 * 获取所有任务
 */
export function fetch() {
  const result = localStorage.getItem(TODO_TASK);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}

/**
 * 保存任务到本地
 * @param {*} task
 */
export function saveFetch(task) {
  localStorage.setItem(TODO_TASK, JSON.stringify(task));
}

/**
 * 随机生成一个id
 */
export function createTodoID() {
  return Math.random().toString(36).slice(-8);
}

/**
 * 筛选任务列表
 * @param {*} todos 任务列表
 * @param {*} stats 筛选条件
 */
export function filter(todos, stats) {
  if (stats === "all") {
    return todos;
  } else if (stats === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (stats === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  throw new Error("条件错误");
}
