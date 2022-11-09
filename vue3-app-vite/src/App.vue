<template>
  <link rel="stylesheet" href="./index.css" />
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          ref="inputs"
          @keyup.enter="handleTodoAdd"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="checkTodoRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="todo in todoRef"
            :key="todo.id"
            :class="{
              completed: todo.completed,
              editing: todo === editTodoRef,
            }"
          >
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                :checked="todo.completed"
                :value="todo.completed"
                @input="handleActive(todo)"
              />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button
                class="destroy"
                @click="handleTodoDelete(todo.id)"
              ></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ unfinishedTodo }}</strong>
          <span>items left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button class="clear-completed" @click="removeCompleted">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useNewTodo from "./components/useNewTodo";
import useFilterTodo from "./components/useFilterTodo";
import useRemoveTodo from "./components/useRemoveTodo";
import useEditTodo from "./components/useEditTodo";
import * as todoStorage from "./utils/todoStorage";
import * as todoAPI from "./api/todo";
import { ref, watchEffect, computed } from "vue";
export default {
  setup() {
    const todoRef = ref([]);
    const visibilityRef = ref("all");

    //获取todos
    async function fetchData() {
      useFilterTodo(visibilityRef);
      const result = await todoAPI.fetchTodo(visibilityRef.value);
      todoRef.value = result;
    }
    fetchData();
    watchEffect(async () => {
      const result = await todoAPI.fetchTodo(visibilityRef.value);
      todoRef.value = result;
    });

    //未完成的任务数量
    const unfinishedTodo = computed(() => {
      return todoStorage.filter(todoRef.value, "active").length;
    });

    const { handleTodoAdd, newTodo } = useNewTodo(todoRef);
    const { handleTodoDelete, removeCompleted } = useRemoveTodo(fetchData);
    return {
      todoRef,
      visibilityRef,
      handleTodoAdd,
      ...useEditTodo(fetchData, todoRef),
      handleTodoDelete,
      newTodo,
      removeCompleted,
      unfinishedTodo,
    };
  },
};
</script>
