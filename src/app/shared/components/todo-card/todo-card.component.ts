import { Component, OnInit, input, output } from '@angular/core';
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
      description: this._todo!.description,
    });
  }

  onChanged<K extends keyof Todo>(prop: K, value: Todo[K]): void {
    this.todoChange.emit({ ...this.todo(), [prop]: value });
  }

  onDelete(): void {
    this.delete.emit(this.todo());
  }

  getPriorityBackgroundClass(priority: Priority): string {
    const classes: Record<Priority, string> = {
      low: 'border-l-5 border-l-green-500/60',
      medium: 'border-l-5 border-l-blue-500/60',
      high: 'border-l-5 border-l-orange-500/60',
      critical: 'border-l-5 border-l-red-500/60',
    };
    return classes[priority];
  }
}
