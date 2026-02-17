import { Component, input, numberAttribute, inject, computed, effect } from '@angular/core';
import { TmdbService } from '../../service/tmdb.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {

  movieId = input(0, { transform: numberAttribute })
  readonly tmdbService = inject(TmdbService)

  constructor() {
    effect(() => {
      console.log("hey movieId", this.movieId())
    })
  }

  readonly #movieResource = rxResource({
    request: () => this.movieId(),
    loader: () => this.tmdbService.getMovieById(this.movieId())
  })

  readonly movie = computed(() => this.#movieResource.value())

}
