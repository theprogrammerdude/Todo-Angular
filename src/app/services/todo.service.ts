import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todoTitle: string = "";
  idForTodo: number = 4;
  beforeEditCache: string = "";
  filter: string = "all";
  todos: Todo[] = [
    {
      id: 1,
      title: "First Todo",
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: "Second Todo",
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: "Third Todo",
      completed: false,
      editing: false
    }
  ];

  constructor() {}

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return alert("Can't enter an Empty Todo!!!");
    }

    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    });

    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAll(): void {
    this.todos.forEach(todo => {
      todo.completed = (<HTMLInputElement>event.target).checked;
    });
  }

  todosFiltered(): Todo[] {
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === "completed") {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
