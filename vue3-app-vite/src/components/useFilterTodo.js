import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../utils/todoStorage";

const validHash = ["all", "active", "completed"];

export default function useFilterTodo(todoListRef) {
  const visibilityRef = ref("all"); //筛选后的任务列表
  const hashChange = () => {
    const hash = location.hash.replace(/#\/?/, "");
    if (validHash.includes(hash)) {
      //有效的hash
      visibilityRef.value = hash;
    } else {
      location.hash = "";
      visibilityRef.value = "all";
    }
  };
  onMounted(() => {
    //组件挂载时调用
    window.addEventListener("hashchange", hashChange);
  });
  onUnmounted(() => {
    //销毁事件
    window.removeEventListener("hashchange", hashChange);
  });
  //根据所选获得对应状态的任务列表
  const filterTodoListRef = computed(() => {
    return filter(todoListRef.value, visibilityRef.value);
  });

  //未完成的任务数量
  const unfinishedTodo = computed(() => {
    return filter(todoListRef.value, "active").length;
  });
  //已完成的任务数量
  const accomplishTodo = computed(() => {
    return filter(todoListRef.value, "completed").length;
  });
  return {
    visibilityRef,
    filterTodoListRef,
    unfinishedTodo,
    accomplishTodo,
  };
}
