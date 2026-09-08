import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus } from '@ng-icons/lucide';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

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
import { HlmProgressImports } from '@spartan-ng/helm/progress';

import { Todo, createDefaultTodo } from '../models/todo.model';
import { TodoItemComponent } from '../shared/components/todo-item/todo-item.component';
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
    HlmProgressImports,
    HlmDialogTrigger,
    TodoItemComponent,
  ],
})
export class HomeComponent implements OnInit {
  todos = signal<Todo[]>([]);

  service = inject(TodoService);

  todo: Todo = { ...createDefaultTodo() };

  public readonly priorityOptions = [
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  doneTodos = computed(() => {
    return this.todos().filter((x) => x.checked);
  });

  today(): string {
    return format(new Date(), 'PPPP', { locale: de });
  }

  progress = computed((): number => {
    const normalizedPercentage = this.doneTodos().length / this.todos().length;
    return normalizedPercentage * 100;
  });

  async updateTodo(todo: Todo): Promise<void> {
    this.todos.set(this.todos().map((t) => (t.id === todo.id ? todo : t)));
    await this.service.update(todo);
    console.info('todo succesfully updated');
  }

  async deleteTodo(todo: Todo): Promise<void> {
    this.todos.set(this.todos().filter((t) => t.id !== todo.id));
    await this.service.delete(todo);
    console.info('todo succesfully deleted');
  }

  async saveNewTodo(): Promise<void> {
    this.todos.set([...this.todos(), this.todo]);
    await this.service.save(this.todo);
    this.todo = { ...createDefaultTodo() };
    console.info('todo succesfully saved');
  }

  ngOnInit(): void {
    const projectPath = this.service.createProjectFolder();
    console.info(`Project Path: ${projectPath}`);

    void this.service.readAll().then((todos: Todo[]) => {
      this.todos.set(todos);
      console.info(`${this.todos.length} todos successfully read`);
    });
  }
}
