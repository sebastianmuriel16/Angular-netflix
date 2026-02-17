import { Component, input, inject, computed, effect } from '@angular/core';
import { Movie, MoviesResponse } from '../../service/model/movie.model';
import { TmdbService } from '../../service/tmdb.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieCardComponent } from '../movie-card/movie-card.component';

export type Mode = "GENRE" | "TREND"

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

  genreId = input<number | undefined>(-1)
  mode = input<Mode>("GENRE")

  tmdbService = inject(TmdbService)

  readonly moviesByGenreResource = rxResource({
    loader: () => this.tmdbService.getMoviesByGenre(this.genreId() ?? -1)
  })

  readonly moviesByTrendResource = rxResource({
    loader: () => this.tmdbService.getTrendMovies()
  })

  readonly movies = computed(() => {
    if (this.mode() === "GENRE") {
      const moviesByGenreResponse = this.moviesByGenreResource.value() ?? {} as MoviesResponse
      if (moviesByGenreResponse.genreId === this.genreId()) {
        return moviesByGenreResponse.results
      }
    }
    else if (this.mode() === "TREND") {
      const moviesByTrendResponse = this.moviesByTrendResource.value() ?? {} as MoviesResponse
      return moviesByTrendResponse.results
    }
    return []
  }
  )

}