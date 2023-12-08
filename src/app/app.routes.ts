import { ResolveFn, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home.page';
import { AboutPageComponent } from './pages/about.page';
import { AlbumPageComponent } from './pages/album.page';

const wildcardSlugResolver: ResolveFn<Array<string>> = (route) => {
  return route.url.map((segment) => segment.path);
};

export const routes: Routes = [
  {
    path: '',
    title: 'Behangmotief archief',
    component: HomePageComponent,
  },
  {
    path: 'about',
    title: 'Behangmotief about',
    component: AboutPageComponent,
  },
  {
    path: 'album',
    children: [
      {
        path: '**',
        component: AlbumPageComponent,
        resolve: {
          slug: wildcardSlugResolver,
        },
      }
    ]
  },
];
