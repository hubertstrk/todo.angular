import { Component, OnInit, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDialogTrigger } from '@spartan-ng/helm/dialog';

import { lucidePen, lucideX } from '@ng-icons/lucide';

import { Priority, Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  providers: [provideIcons({ lucidePen, lucideX })],
  imports: [
    NgClass,
    NgIcon,
    TranslatePipe,
    HlmButtonImports,
    HlmItemImports,
    HlmCheckboxImports,
    HlmLabelImports,
    HlmTooltipImports,
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
    this.todoChange.emit({
      ...this.todo(),
      title: this._todo!.title,
      description: this._todo!.description,
    });
  }

  onChanged<K extends keyof Todo>(prop: K, value: Todo[K]): void {
    this.todoChange.emit({ ...this.todo(), [prop]: value });
  }

  onDelete(): void {
    this.delete.emit(this.todo());
  }

  getPriorityClass(priority: Priority): string {
    const classes: Record<Priority, string> = {
      low: 'text-green-500',
      medium: 'text-blue-500',
      high: 'text-orange-500',
      critical: 'text-red-500',
    };
    return classes[priority];
  }
}
