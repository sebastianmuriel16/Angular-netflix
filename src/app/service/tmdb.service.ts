import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, MoviesResponse } from './model/movie.model';
import { GenreResponse } from './model/genre.model';
import { catchError, Observable, throwError, tap, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  baseUrl = 'https://api.themoviedb.org/3';

  readonly #fetchTrendMovieSignal = signal<MoviesResponse | null>(null);
  readonly trendMovies = computed(() => this.#fetchTrendMovieSignal());

  readonly #genresSignal = signal<GenreResponse | null>(null);
  readonly genres = computed(() => this.#genresSignal());

  readonly #httpClient = inject(HttpClient);

  getTrendMovies(): Observable<MoviesResponse> {
    return this.#httpClient.get<MoviesResponse>(`${this.baseUrl}/trending/movie/day`, {
      headers: {
        'Authorization': `Bearer ${environment.TMDB_API_KEY}`
      }
    }).pipe(
      tap(response => this.#fetchTrendMovieSignal.set(response)),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }
      )
    );
  }

  getAllMovies(): Observable<GenreResponse> {
    return this.#httpClient.get<GenreResponse>(`${this.baseUrl}/genre/movie/list?language=en`, {
      headers: {
        'Authorization': `Bearer ${environment.TMDB_API_KEY}`
      }
    }).pipe(
      tap(response => this.#genresSignal.set(response)),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }
      )
    );
  }

  getMoviesByGenre(genreId: number): Observable<MoviesResponse> {
    let queryParams = new HttpParams()
      .set('language', 'en-US')
      .set('with_genres', genreId);
    return this.#httpClient.get<MoviesResponse>(`${this.baseUrl}/discover/movie`, {
      params: queryParams,
      headers: {
        'Authorization': `Bearer ${environment.TMDB_API_KEY}`
      },
    }).pipe(
      map(response => ({
        ...response,
        genreId
      })),
      // tap(Response => console.log('Respuesta con genreId:', Response)),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }

  getMovieById(id: number): Observable<Movie> {
    let queryParams = new HttpParams()
      .set('language', 'en-US')
    return this.#httpClient.get<Movie>(`${this.baseUrl}/movie/${id}`, {
      params: queryParams,
      headers: {
        'Authorization': `Bearer ${environment.TMDB_API_KEY}`
      },
    })
  }

  searchByTerm(term: string): Observable<MoviesResponse> {
    let queryParams = new HttpParams()
      .set('language', 'en-US')
      .set('query', term);
    return this.#httpClient.get<MoviesResponse>(`${this.baseUrl}/search/movie`, {
      params: queryParams,
      headers: {
        'Authorization': `Bearer ${environment.TMDB_API_KEY}`
      },
    })
  }



  getImageUrl(id: string, size: 'original' | 'w500' | 'w200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }




  constructor() { }
}
