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
