import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Movie } from '../Interfaces/movie';
import { MovieFavorite } from '../Interfaces/moviefavorite';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + 'Movie/';
  private bdUrl: string = this.endpoint + 'Movies/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}GetMoviesPopular`);
  }
  addFavorite(request: MovieFavorite): Observable<MovieFavorite> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<MovieFavorite>(`${this.bdUrl}AddFavorite`, request, {headers});
  }

  getFavoriteList(): Observable<[]> {
    const id=this.authService.currentUser.id
    return this.http.get<[]>(
      `${this.bdUrl}GetMoviesByUserId/${id}`
    );
  }

  eliminarFavorito(idMovie: number): Observable<void> {
    const idUser = this.authService.currentUser.id;
    return this.http.delete<void>(`${this.bdUrl}RemoveFavorite/${idUser}/${idMovie}`);
  }

  buscarPelicula(searchTerm: string):Observable<Movie[]>{
    const params={searchTerm};
    console.log("__>"+searchTerm)
    return 	this.http.get<Movie[]>(`${this.apiUrl}SearchMovie`,{params})
  }
  
  encontrarPeliculaById(movie_id:number):Observable<Movie>{
    return 	this.http.get<Movie>(`${this.apiUrl}GetMovieById/${movie_id}`)
  }

}
