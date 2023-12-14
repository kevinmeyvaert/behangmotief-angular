import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, filter, from, map, of, switchMap, tap } from 'rxjs';
import { ALBUM_QUERY } from '../queries/wannabes.queries';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'album-page',
  standalone: true,
  imports: [NgOptimizedImage],
  styles: `
  h1 {
    margin-top: 1rem;
  }
  img {
    width: 100%;
  }
  .photos {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    justify-items: center;
  }
  `,
  template: ` @if (loading()) { Loading... } @else {
    <section class="photos">
      <h1>{{ album().artist.name }} - {{ album().venue.name }}</h1>
      @for (photo of album().images; track photo.blurhash; let index = $index) {
      <img
        [src]="'https://images.wannabes.be/S=W1600,H1600,PD2/' + photo.hires"
      />
      }
    </section>
    }`,
})
export class AlbumPageComponent {
  private apolloClient = inject(Apollo);

  @Input()
  private set slug(slug: string[] | undefined) {
    this.slug$.next(slug ?? []);
  }
  private slug$ = new BehaviorSubject<string[]>([]);

  private albumQuery = this.slug$.pipe(
    filter((slug) => slug.length > 0),
    switchMap((slug) => this.apolloClient.watchQuery<any>({
      query: ALBUM_QUERY,
      variables: { slug: slug.join('/') },
    }).valueChanges));

  loading = toSignal(this.albumQuery.pipe(map(({ loading }) => loading)), { initialValue: true });
  album = toSignal(this.albumQuery.pipe(map(({ data }) => data.post)), { initialValue: {} });
}
