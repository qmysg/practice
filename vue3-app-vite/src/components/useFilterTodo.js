import { ref, onMounted, onUnmounted, computed } from "vue";

const validHash = ["all", "active", "completed"];

export default function useFilterTodo(visibilityRef) {
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

  return {
    visibilityRef,
  };
}
