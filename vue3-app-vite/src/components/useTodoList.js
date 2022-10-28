import { ref, watchEffect } from "vue";
import * as todoStorage from "../utils/todoStorage";

//任务列表
export default function useTodoList() {
  const todoRef = ref(todoStorage.fetch());
  watchEffect(() => {
    //任务列表改变后重新保存任务
    todoStorage.saveFetch(todoRef.value);
  });
  return {
    todoRef,
  };
}
