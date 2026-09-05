import { Component, input, output } from '@angular/core';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  imports: [HlmCheckboxImports, HlmItemImports]
})

export class TodoCardComponent {
  todo = input.required<Todo>();
  todoChange = output<Todo>();
  delete = output<Todo>();

  onTitleChanged(title: string): void {
    this.todoChange.emit({...this.todo(), title});
  }

  onDescriptionChanged(description: string): void {
    this.todoChange.emit({...this.todo(), description});
  }

  onCheckedChange(checked: boolean): void {
    this.todoChange.emit({...this.todo(), checked});
  }

  onDelete(): void {
    this.delete.emit(this.todo());
  }
}
