import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'albums',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <section style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
      @for (post of posts; track post.id) {
      <a [routerLink]="'/album/' + post.slug">
        <figure>
          <img
            [ngSrc]="
              'https://images.wannabes.be/S=W1600,H1600,PD2/' +
              post.thumbnail.hires
            "
            [alt]="post.artist.name"
            width="300"
            height="200"
          />
          <figcaption>
            {{ post.artist.name }} - {{ post.venue.name }}
          </figcaption>
        </figure>
      </a>
      }
    </section>
  `,
})
export class AlbumsComponent {
  @Input() posts: any[] = [];
}
