import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { Todo, Priority } from '../models/todo.model';
import { TodoCardComponent } from '../shared/components/todo-card/todo-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [provideIcons({ lucideArrowUp })],
  imports: [CommonModule, HlmButtonImports, TodoCardComponent],
})
export class HomeComponent {
  todos = signal<Todo[]>([
    {
      title: 'Learn Angular Signals',
      description: 'Master the new signals API in Angular 22 and many other feature including spartan ui, typescript and a lot more stuff to visit',
      priority: Priority.high,
      checked: false,
      createdAt: new Date('2026-09-01'),
    },
    {
      title: 'Build Todo App',
      description: 'Create a complete todo application with Electron',
      priority: Priority.high,
      checked: false,
      createdAt: new Date('2026-09-02'),
    },
    {
      title: 'Setup ESLint & Prettier',
      description: 'Configure code formatting and linting',
      priority: Priority.medium,
      checked: true,
      createdAt: new Date('2026-09-03'),
    },
  ]);

  onTodoChange(todo: Todo): void {
    this.todos.set(
      this.todos().map((t) =>
        t.title === todo.title ? todo : t
      )
    );
  }

  onTodoDelete(todo: Todo): void {
    this.todos.set(
      this.todos().filter((t) => t.title !== todo.title)
    );
  }
}
