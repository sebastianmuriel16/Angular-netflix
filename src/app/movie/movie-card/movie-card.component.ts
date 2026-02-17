import { Component, input, inject } from '@angular/core';
import { Movie } from '../../service/model/movie.model';
import { TmdbService } from '../../service/tmdb.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  movie = input<Movie>();
  tmdbService = inject(TmdbService)
}
