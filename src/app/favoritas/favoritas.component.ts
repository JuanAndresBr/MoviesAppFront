import { Component, OnInit } from '@angular/core';
import { Movie } from '../Interfaces/movie';
import { MoviesService } from '../Services/movies.service';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.css'],
})
export class FavoritasComponent implements OnInit {
  favoritas: Movie[] = [];
  listFavoritesMovies: any[] = [];

  constructor(private movieServicio: MoviesService) {
    this.listFavoritesMovies = [];
  }

  obtenerFavoriteMovies() {
    this.movieServicio.getFavoriteList().subscribe({
      next: (data) => {
        this.listFavoritesMovies = data;
        this.obtenerPeliculasPopulares();
      },
      error: (e) => {
        console.log('Error en conseguir la lista de favoritos' + e);
      },
    });
  }

  obtenerPeliculasPopulares() {
    this.movieServicio.getPopularMovies().subscribe({
      next: (data) => {
        // Filtrar películas populares que son favoritas
        // Filtrar películas populares que son favoritas
        const favoritasPopulares = data.filter((movie) =>
          this.listFavoritesMovies.includes(movie.id)
        );

        // Mapear las películas populares para establecer la propiedad 'favorite' en true
        const favoritasPopularesConFavorite = favoritasPopulares.map((movie) => ({
          ...movie,
          favorite: true
        }));
        for (const movieId of this.listFavoritesMovies) {
          const peliculaExistente = favoritasPopulares.find(
            (movie) => movie.id === movieId
          );
          if (!peliculaExistente) {
            this.movieServicio.encontrarPeliculaById(movieId).subscribe({
              next: (nuevaPelicula) => {
                this.favoritas.push({ ...nuevaPelicula, favorite: true });
              },
              error: (e) => {
                console.log('Error al obtener detalles de la película' + e);
              },
            });
          }
        }

        this.favoritas = [...this.favoritas, ...favoritasPopularesConFavorite];
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.obtenerFavoriteMovies();
  }
}
