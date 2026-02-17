import { Component, signal, inject, computed, effect } from '@angular/core';
import { MovieCardComponent } from '../movie/movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../service/tmdb.service';
import { Movie } from '../service/model/movie.model';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  activedRoute = inject(ActivatedRoute)
  tmdbService = inject(TmdbService)

  readonly queryTerm = toSignal(
    this.activedRoute.queryParamMap.pipe(
      map(params => params.get('q') ?? '')
    ),
    { initialValue: '' }
  )

  readonly moviesByTermResource = rxResource({
    request: () => this.queryTerm(),
    loader: () => this.tmdbService.searchByTerm(this.queryTerm())
  })

  readonly movies = computed<Movie[] | undefined>(() => this.moviesByTermResource.value()?.results)



}
