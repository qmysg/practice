/**
 * 获取所有任务
 */
export async function fetchTodo(type) {
  const resp = await fetch(`http://127.0.0.1:3001/?type=${type}`);
  const data = await resp.json();
  if (data.code === 0 && data.data) {
    return data.data;
  }
  return [];
}

/**
 * 修改任务
 * @param {*} todo
 */
export async function updateTodo(todo) {
  await fetch(`http://127.0.0.1:3001/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

/**
 * 修改所有任务的状态
 * @param {*}
 */
export async function updateTodoState(type) {
  const resp = await fetch(`http://127.0.0.1:3001/?type=${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  return await resp.json();
}

/**
 * 删除任务
 * @param {*} todo
 */
export async function deleteTodo(id = "") {
  await fetch(`http://127.0.0.1:3001/${id}`, {
    method: "delete",
  });
}

/**
 * 添加任务
 * @param {*} todo
 */
export async function addTodo(title) {
  const body = {
    title,
    completed: false,
  };
  const resp = await fetch(`http://127.0.0.1:3001/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data.data;
}
