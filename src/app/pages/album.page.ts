import { Component, Input, inject } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
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
  template: ` @if (loading) { Loading... } @else {
    <section class="photos">
      <h1>{{ album.artist.name }} - {{ album.venue.name }}</h1>
      @for (photo of album.images; track photo.blurhash; let index = $index) {
      <img
        [src]="'https://images.wannabes.be/S=W1600,H1600,PD2/' + photo.hires"
      />
      }
    </section>
    }`,
})
export class AlbumPageComponent {
  @Input() slug?: string[];

  apolloClient = inject(Apollo);
  querySubscription: Subscription;
  albumQuery: QueryRef<any>;

  loading = false;
  album: any;

  ngOnInit() {
    this.albumQuery = this.apolloClient.watchQuery<any>({
      query: ALBUM_QUERY,
      variables: { slug: this.slug?.join('/') },
    });

    this.querySubscription = this.albumQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.album = data.post;
      }
    );
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
