import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';

import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  providers: [provideIcons({ lucideArrowUp })],
  imports: [CommonModule, NgIcon, HlmButtonImports],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }
}
