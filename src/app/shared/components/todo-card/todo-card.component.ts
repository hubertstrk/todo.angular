import { Component, input, output } from '@angular/core';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';

import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  imports: [HlmCheckboxImports, HlmItemImports, HlmLabelImports]
})

export class TodoCardComponent {
  todo = input.required<Todo>();
  todoChange = output<Todo>();
  delete = output<Todo>();

  onChanged<K extends keyof Todo>(prop: K, value: Todo[K]): void {
    this.todoChange.emit({ ...this.todo(), [prop]: value });
  }

  onDelete(): void {
    this.delete.emit(this.todo());
  }
}
