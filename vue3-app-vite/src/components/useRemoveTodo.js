import * as todoAPI from "../api/todo";

//删除todo
export default function useRemoveTodo(fetchData) {
  const handleTodoDelete = async (id) => {
    await todoAPI.deleteTodo(id);
    fetchData();
  };
  //删除所有已完成的
  const removeCompleted = async () => {
    await todoAPI.deleteTodo();
    fetchData();
  };
  return {
    handleTodoDelete,
    removeCompleted,
  };
}
