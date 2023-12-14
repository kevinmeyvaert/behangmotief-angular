import { Component, inject } from '@angular/core';
import { SearchFormComponent } from '../components/searchform.component';
import { Apollo } from 'apollo-angular';
import { SEARCH_QUERY } from '../queries/wannabes.queries';
import { map } from 'rxjs';
import { AlbumsComponent } from '../components/albums.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [SearchFormComponent, AlbumsComponent, AsyncPipe],
  template: `
    <search-form (submitSearchResultEvent)="handleSearch($event)" />
    @if (loading$ | async) { Loading... } @else { <albums [posts]="posts$ | async" /> }
  `,
})
export class HomePageComponent {
  private apolloClient = inject(Apollo);
  private postsQuery = this.apolloClient.watchQuery<any>({
    query: SEARCH_QUERY,
  });

  loading$ = this.postsQuery.valueChanges.pipe(
    map(({loading}) => loading)
  );

  posts$ = this.postsQuery.valueChanges.pipe(
    map(({data}) => data.posts.data)
  );

  handleSearch(item: string) {
    this.postsQuery.refetch({ all: item });
  }
}
