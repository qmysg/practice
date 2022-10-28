import { ref, computed } from "vue";

export default function useEditTodo(todoListRef) {
  const editTodoRef = ref(null); //要编辑的todo
  let cacheEditTitle = null; //缓存要编辑的内容
  //编辑
  const editTodo = (todo) => {
    editTodoRef.value = todo;
    cacheEditTitle = todo.title;
  };
  //保存编辑
  const doneEdit = (todo) => {
    editTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      //无内容，删除
      todoListRef.value.splice(todoListRef.value.indexOf(todo.id), 1);
    }
  };
  //取消编辑
  const cancelEdit = (todo) => {
    todo.title = cacheEditTitle;
  };

  //全选或全不选
  const checkTodoRef = computed({
    get() {},
    set(checked) {
      todoListRef.value.forEach((todo) => (todo.completed = checked));
    },
  });
  return {
    editTodoRef,
    editTodo,
    doneEdit,
    cancelEdit,
    checkTodoRef,
  };
}
