import { Component, inject, computed } from '@angular/core';
import { TmdbService } from '../../service/tmdb.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieListComponent } from "../movie-list/movie-list.component";

@Component({
  selector: 'app-movie-selector',
  imports: [MovieListComponent],
  templateUrl: './movie-selector.component.html',
  styleUrl: './movie-selector.component.scss'
})
export class MovieSelectorComponent {

  tmdbService = inject(TmdbService)

  readonly genresResource = rxResource({
    loader: () => this.tmdbService.getAllMovies()
  })

  readonly genres = computed(() => this.genresResource.value()?.genres)


}
