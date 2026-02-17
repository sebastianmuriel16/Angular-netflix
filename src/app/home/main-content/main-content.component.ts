import { Component, computed, inject, } from '@angular/core';
import { TmdbService } from '../../service/tmdb.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../service/model/movie.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main-content',
  imports: [FontAwesomeModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {



  tmdbService = inject(TmdbService);

  readonly trendMoviesResource = rxResource({
    loader: () => this.tmdbService.getTrendMovies()
  })

  readonly trendMovie = computed<Movie | undefined>(() => this.trendMoviesResource.value()?.results[0])

}
