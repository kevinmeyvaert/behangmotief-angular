import { Component, Input, inject } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ALBUM_QUERY } from '../queries/wannabes.queries';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'album-page',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `<h1>Album</h1>
    @if (loading) { Loading... } @else {
    <h2>{{ album.artist.name }} - {{ album.venue.name }}</h2>
    @for (photo of album.images; track photo.blurhash) {
    <img
      [ngSrc]="'https://images.wannabes.be/S=W1600,H1600,PD2/' + photo.hires"
      width="300"
      height="200"
    />
    } }`,
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
