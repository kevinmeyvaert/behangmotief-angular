import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  styles: `
  main {
  display: flex;
  flex-direction: column;
  align-items: center;
  }
  .navigation {
  display: flex;
  width: 100%;
  gap: 1rem;
  padding: 0 2rem;
}
.content {
  width: 100%;
  max-width: 1400px;
}`,
  template: `<main>
    <mat-toolbar>
      <span>{{ title }}</span>
      <nav class="navigation">
        <button mat-button color="primary" routerLink="/">Home</button>
        <button mat-button color="primary" routerLink="/about">About</button>
      </nav>
    </mat-toolbar>
    <section class="content">
      <router-outlet />
    </section>
  </main>`,
})
export class AppComponent {
  title = '📓 Behangmotief Archief';
}
