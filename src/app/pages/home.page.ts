import { Component, inject } from '@angular/core';
import { SearchFormComponent } from '../components/searchform.component';
import { Apollo, QueryRef } from 'apollo-angular';
import { SEARCH_QUERY } from '../queries/wannabes.queries';
import { Subscription } from 'rxjs';
import { AlbumsComponent } from '../components/albums.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [SearchFormComponent, AlbumsComponent],
  template: `
    <h1>Homepage</h1>
    <search-form (submitSearchResultEvent)="handleSearch($event)" />
    @if (loading) { Loading... } @else { <albums [posts]="posts" /> }
  `,
})
export class HomePageComponent {
  apolloClient = inject(Apollo);
  querySubscription: Subscription;
  postsQuery: QueryRef<any>;

  loading = false;
  posts: any;

  ngOnInit() {
    this.postsQuery = this.apolloClient.watchQuery<any>({
      query: SEARCH_QUERY,
    });

    this.querySubscription = this.postsQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.posts.data;
      }
    );
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  handleSearch(item: string) {
    this.postsQuery.refetch({ all: item });
  }
}
