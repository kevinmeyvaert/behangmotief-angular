import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `<main>
    {{ title }}
    <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet />
  </main>`,
})
export class AppComponent {
  title = 'behangmotief-angular';
}
  