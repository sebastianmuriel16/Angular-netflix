import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { SearchComponent } from './search/search.component';
import { movieIdMatcher } from './movie/matchers/movie-id-matcher';


export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: HomeComponent },
            {
                // loadComponent: () => import('./movie/movie-detail/movie-detail.component')
                //     .then(m => m.MovieDetailComponent),
                matcher: movieIdMatcher,
                component: MovieDetailComponent

            }

        ]

    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
