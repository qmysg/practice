import { ref, watchEffect } from "vue";
import * as todoAPI from "../api/todo";

//任务列表
export default async function useTodoList() {
  const todoRef = ref(null);
  const result = await todoAPI.fetchTodo();
  todoRef.value = result;

  return {
    todoRef,
  };
}
