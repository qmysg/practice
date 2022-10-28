import { ref, watchEffect } from "vue";
import * as todoStorage from "../utils/todoStorage";

/**
 * //保存一个任务
 * @param {*} todoList 任务列表
 */
export default function useNewTodo(todoListRef) {
  const newTodoRef = ref(""); //任务内容
  const addTodo = function () {
    const value = newTodoRef.value && newTodoRef.value.trim("");
    if (!value) {
      return;
    }
    const todo = {
      id: todoStorage.createTodoID(),
      title: newTodoRef.value,
      completed: false, //任务是否完成
    };
    //添加任务到任务列表，并清空输入框
    todoListRef.value.push(todo);
    newTodoRef.value = "";
  };

  return {
    newTodoRef,
    addTodo,
  };
}
