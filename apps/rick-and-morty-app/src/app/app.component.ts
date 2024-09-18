import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/components/menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, MenuComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'rick-and-morty-app';
}
