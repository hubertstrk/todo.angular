import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus } from '@ng-icons/lucide';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDialogTrigger } from '@spartan-ng/helm/dialog';

import { Todo, DefaultTodo } from '../models/todo.model';
import { TodoCardComponent } from '../shared/components/todo-card/todo-card.component';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [provideIcons({ lucideArrowUp, lucidePlus })],
  imports: [
    NgIcon,
    CommonModule,
    HlmButtonImports,
    HlmSelectImports,
    HlmButtonImports,
    HlmCheckboxImports,
    HlmItemImports,
    HlmLabelImports,
    HlmFieldImports,
    HlmDialogImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmDialogTrigger,
    TodoCardComponent,
  ],
})
export class HomeComponent implements OnInit {
  todos = signal<Todo[]>([]);

  service = inject(TodoService);

  todo: Todo = { ...DefaultTodo };

  public readonly priorityOptions = [
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  async updateTodo(todo: Todo): Promise<void> {
    this.todos.set(
      this.todos().map((t) => (t.id === todo.id ? todo : t))
    );
    await this.service.update(todo);
    console.info('todo succesfully updated')
  }

  async deleteTodo(todo: Todo): Promise<void> {
    this.todos.set(this.todos().filter((t) => t.id !== todo.id));
    await this.service.delete(todo);
    console.info('todo succesfully deleted');
  }

  async saveNewTodo(): Promise<void> {
    this.todos.set([...this.todos(), this.todo]);
    await this.service.save(this.todo);
    this.todo = { ...DefaultTodo };
    console.info('todo succesfully saved')
  }

  ngOnInit(): void {
    const projectPath = this.service.createProjectFolder();
    console.info(`Project Path: ${projectPath}`);

    void this.service.readAll().then((todos: Todo[]) => {
      this.todos.set(todos);
      console.info(`${this.todos.length} todos successfully read`)
    });
  }
}
