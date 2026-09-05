import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, TranslatePipe]
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
