import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/model/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  public mode = 'list';

  constructor(private fb: FormBuilder, private flashMessage: FlashMessagesService) {
    this.form = this.fb.group({
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required,
      ])]
    });
    this.load();
  }

  showMessageFlash(msg: string, type: string) {
    this.flashMessage.show(msg, { cssClass: type, timeout: 2000 });
  }

  adiciona() {
    const description = this.form.controls['description'].value;
    this.todos.push(new Todo(this.generateId(), description, false));
    this.save();
    this.clear();
    this.showMessageFlash('Tarefa adicionada com sucesso!', 'alert-success');
  }

  generateId() {
    const id = this.todos.reduce((max, character) => (character.id > max ? character.id : max), this.todos[0] ? this.todos[0].id : 0)
    return Number(id) + 1;
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
      this.showMessageFlash('Tarefa removida com sucesso!', 'alert-success');
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
    this.showMessageFlash('Tarefa concluída com sucesso!', 'alert-success');
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
    this.showMessageFlash('Tarefa reaberta com sucesso!', 'alert-success');
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.changeMode('list');
  }

  load() {
    const data = localStorage.getItem('todos');
    this.todos = data ? JSON.parse(data) : [];
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  removelAll() {
    localStorage.removeItem('todos');
    this.load();
    this.showMessageFlash('Tarefas removidos com sucesso!', 'alert-success');
  }
}
