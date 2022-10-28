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
          v-model="newTodoRef"
          @keyup.enter="addTodo"
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
            v-for="todo in filterTodoListRef"
            :key="todo.id"
            :class="{
              completed: todo.completed,
              editing: todo === editTodoRef,
            }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="remove(todo)"></button>
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
        <button
          class="clear-completed"
          v-show="accomplishTodo > 0"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./components/useTodoList";
import useNewTodo from "./components/useNewTodo";
import useFilterTodo from "./components/useFilterTodo";
import useRemoveTodo from "./components/useRemoveTodo";
import useEditTodo from "./components/useEditTodo";
export default {
  setup() {
    const { todoRef } = useTodoList();
    return {
      ...useNewTodo(todoRef),
      ...useFilterTodo(todoRef),
      ...useRemoveTodo(todoRef),
      ...useEditTodo(todoRef),
    };
  },
};
</script>
