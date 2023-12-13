import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'albums',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    AsyncPipe,
  ],
  styles: `
  .card {
    cursor: pointer;
  }
  .card-header {
    padding-bottom: 1rem;
  }`,
  template: `
    <mat-grid-list [cols]="breakpoint$ | async" rowHeight="320px">
      @for (post of posts; track post.id) {
      <mat-grid-tile>
        <mat-card [routerLink]="'/album/' + post.slug" class="card">
          <img
            mat-card-image
            [ngSrc]="
              'https://images.wannabes.be/S=W300,H200,PD2/' +
              post.thumbnail.hires
            "
            [alt]="post.artist.name"
            width="300"
            height="200"
            priority
          />
          <mat-card-header class="card-header">
            <mat-card-title>{{ post.artist.name }}</mat-card-title>
            <mat-card-subtitle>{{ post.venue.name }}</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </mat-grid-tile>
      }
    </mat-grid-list>
  `,
})
export class AlbumsComponent {
  @Input() posts: any[] = [];

  breakpoint$ = fromEvent(window, 'resize').pipe(
    map(() => this.handleResize(window.innerWidth)),
    startWith(this.handleResize(window.innerWidth)),
  );

  private handleResize(windowWidth: number) {
    switch (true) {
      case windowWidth <= 600:
        return 1;
      case windowWidth <= 1000:
        return 2;
      case windowWidth <= 1400:
        return 3;
      default:
        return 4;
    }
  }
}
