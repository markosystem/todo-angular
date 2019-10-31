import { Component } from '@angular/core';
import { Todo } from 'src/model/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Minhas Tarefas';
  public todos: Todo[] = [];
  public form: FormGroup;
  public entity: Todo;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required,
      ])]
    });
    this.load();

    /*     this.todos.push(new Todo(1, 'Tarefa Registrada', false));
        this.todos.push(new Todo(2, 'Tarefa Registrada', true));
        this.todos.push(new Todo(3, 'Tarefa Registrada', true));
        this.todos.push(new Todo(4, 'Tarefa Registrada', false)); */
  }

  adiciona() {
    const id = this.todos.length + 1;
    const description = this.form.controls['description'].value;
    this.todos.push(new Todo(id, description, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    this.todos = data ? JSON.parse(data) : [];
  }
}
