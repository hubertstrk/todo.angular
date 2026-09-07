import { Component, input, output, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDialogTrigger } from '@spartan-ng/helm/dialog';
import { lucidePen, lucideX } from '@ng-icons/lucide';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: 'todo-item.component.html',
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
  ]
})

export class TodoItemComponent implements OnInit {
  todo = input.required<Todo>();
  todoChange = output<Todo>();
  delete = output<Todo>();

  todoBuffer : Todo | null = null;

  ngOnInit(): void {
    this.todoBuffer = this.todo();
  }

  saveTodo(): void {
    this.todoChange.emit(this.todoBuffer!);
  }

  deleteTodo(): void {
    this.delete.emit(this.todo());
  }
}
