export default function useRemoveTodo(todoListRef) {
  const remove = (todo) => {
    todoListRef.value.splice(todoListRef.value.indexOf(todo.id), 1);
  };
  //删除所有已完成的
  const removeCompleted = () => {
    todoListRef.value = todoListRef.value.filter((todo) => !todo.completed);
  };
  return {
    remove,
    removeCompleted,
  };
}
