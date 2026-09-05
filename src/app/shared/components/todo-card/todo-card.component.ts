import { Component, model } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  imports: [HlmCardImports]
})

export class TodoCardComponent {
  todo = model.required<Todo>();

  onIsDoneChanged(isDone: boolean): void {
    this.todo.set({...this.todo(), isDone});
  }

  onTitleChanged(title: string): void {
    this.todo.set({ ...this.todo(), title });
  }

  onDescriptionChanged(description: string): void {
    this.todo.set({...this.todo(), description});
  }
}
