import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {

  todos = signal<Todo[]>([]);

  todoTitle = '';
  editingId: number | null = null;


  // ADD
  addTodo() {

    if (!this.todoTitle.trim()) {
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      title: this.todoTitle,
      completed: false
    };

    this.todos.update(list => [
      ...list,
      todo
    ]);

    this.todoTitle = '';
  }


  // GET
  getTodos() {
    return this.todos();
  }


  // EDIT
  editTodo(todo: Todo) {

    this.todoTitle = todo.title;
    this.editingId = todo.id;

  }


  // UPDATE
  updateTodo() {

    if (
      !this.todoTitle.trim() ||
      this.editingId === null
    ) {
      return;
    }

    this.todos.update(list =>
      list.map(todo =>
        todo.id === this.editingId
          ? {
              ...todo,
              title: this.todoTitle
            }
          : todo
      )
    );

    this.todoTitle = '';
    this.editingId = null;

  }


  // DELETE
  deleteTodo(id: number) {

    this.todos.update(list =>
      list.filter(todo => todo.id !== id)
    );

  }


  // COMPLETE
  toggleTodo(id: number) {

    this.todos.update(list =>
      list.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );

  }


  // CANCEL
  cancelEdit() {

    this.todoTitle = '';
    this.editingId = null;

  }
}