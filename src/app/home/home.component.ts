import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus } from '@ng-icons/lucide';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDialogTrigger } from '@spartan-ng/helm/dialog';

import { Todo, Priority, DefaultTodo } from '../models/todo.model';
import { TodoCardComponent } from '../shared/components/todo-card/todo-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [provideIcons({ lucideArrowUp, lucidePlus })],
  imports: [
    NgIcon,
    CommonModule,
    HlmButtonImports,
    TodoCardComponent,
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
export class HomeComponent {
  todos = signal<Todo[]>([
    {
      title: 'Learn Angular Signals',
      description:
        'Master the new signals API in Angular 22 and many other feature including spartan ui, typescript and a lot more stuff to visit',
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

  todo: Todo = { ...DefaultTodo };

  onTodoChange(todo: Todo): void {
    this.todos.set(
      this.todos().map((t) => (t.title === todo.title ? todo : t))
    );
  }

  onTodoDelete(todo: Todo): void {
    this.todos.set(this.todos().filter((t) => t.title !== todo.title));
  }

  saveTodo() {
    this.todos.set([...this.todos(), this.todo]);
    this.todo = { ...DefaultTodo };
  }
}
