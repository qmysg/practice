import { ref, computed } from "vue";
import * as todoAPI from "../api/todo";

export default function useEditTodo(fetchData, todoRef) {
  const editTodoRef = ref(null); //要编辑的todo
  let cacheEditTitle = null; //缓存要编辑的内容
  //编辑
  const editTodo = (todo) => {
    editTodoRef.value = todo;
    cacheEditTitle = todo.title;
  };
  //保存编辑
  const doneEdit = async (todo) => {
    editTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      //无内容，删除
      await todoAPI.deleteTodo(todo.id);
      //重新请求数据
      await fetchData();
    }
  };
  //取消编辑
  const cancelEdit = (todo) => {
    todo.title = cacheEditTitle;
  };

  //全选或全不选
  const checkTodoRef = computed({
    get() {},
    async set(checked) {
      const { data } = await todoAPI.updateTodoState(checked);
      todoRef.value = data;
    },
  });

  //处理选中的todo
  const handleActive = async function (todo) {
    todo.completed = !todo.completed;
    await todoAPI.updateTodo(todo);
  };
  return {
    editTodo,
    doneEdit,
    cancelEdit,
    editTodoRef,
    handleActive,
    checkTodoRef,
  };
}
