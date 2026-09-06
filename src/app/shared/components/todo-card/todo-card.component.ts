import { Component, OnInit, input, output } from '@angular/core';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDialogTrigger } from '@spartan-ng/helm/dialog';

import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  imports: [
    HlmButtonImports,
    HlmCheckboxImports,
    HlmItemImports,
    HlmLabelImports,
    HlmFieldImports,
    HlmDialogImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmDialogTrigger,
  ],
})
export class TodoCardComponent implements OnInit {
  todo = input.required<Todo>();
  todoChange = output<Todo>();
  delete = output<Todo>();

  _todo: Todo | null = null;

  ngOnInit(): void {
    this._todo = this.todo();
  }

  saveTodo() {
    this.todoChange.emit({...this.todo(), title: this._todo!.title, description: this._todo!.description})
  }

  onChanged<K extends keyof Todo>(prop: K, value: Todo[K]): void {
    this.todoChange.emit({ ...this.todo(), [prop]: value });
  }

  onDelete(): void {
    this.delete.emit(this.todo());
  }
}
