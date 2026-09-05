import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { hlmH1 } from '@spartan-ng/helm/typography';

import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterLink, TranslatePipe]
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
