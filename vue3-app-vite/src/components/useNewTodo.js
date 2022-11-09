import { ref } from "vue";
import * as todoAPI from "../api/todo";

//添加todo
export default function useNewTodo(todoRef) {
  const newTodo = ref("");
  const handleTodoAdd = async () => {
    const value = newTodo.value && newTodo.value.trim("");
    if (!value) {
      return;
    }
    const resp = await todoAPI.addTodo(value);
    todoRef.value.push(resp);
    newTodo.value = null;
  };
  return {
    newTodo,
    handleTodoAdd,
  };
}
