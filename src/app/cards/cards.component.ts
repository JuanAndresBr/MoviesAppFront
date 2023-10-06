import { Movie } from '../Interfaces/movie';
import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../Services/movies.service';
import { AuthService } from '../auth.service';
import { DetallePeliculaModalService } from '../Services/DetallePeliculaModalService';
import { DetallesMovieComponent } from '../detalles-movie/detalles-movie.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() listaMovies: Movie[] = [];
  listFavoritesMovies: any[] = [];

  constructor(
    private movieServicio: MoviesService,
    private authService: AuthService,
    private detallePeliculaModalService: DetallePeliculaModalService
  ) {
    this.listFavoritesMovies = [];
  }
  mostrarDetallePeliculaModal(pelicula: Movie): void {
    this.detallePeliculaModalService.abrirDetallePeliculaModal(DetallesMovieComponent, { pelicula }); // Pasa los datos de la película como objeto
  }
  agregarFavorito(idMovie: number) {
    const request = {
      idUser: this.authService.currentUser.id,
      idMovie: idMovie,
    };
    this.movieServicio.addFavorite(request).subscribe({
      next: (data) => {
        const pelicula = this.listaMovies.find((p) => p.id === idMovie);
        if (pelicula) {
          pelicula.favorite = true;
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  mostrarDetallePelicula(id: number): void {
    // Construye la URL para el componente de detalles de la película
    const url = `/details/${id}`;

    // Abre una nueva ventana emergente
    window.open(url, 'DetallePelicula', 'width=800,height=600');
  }

  eliminarFavorito(idMovie: number) {
    this.movieServicio.eliminarFavorito(idMovie).subscribe({
      next: () => {
        // Si se elimina correctamente en el servidor, actualiza el estado local
        const pelicula = this.listaMovies.find((p) => p.id === idMovie);
        if (pelicula) {
          pelicula.favorite = false;
        }
      },
      error: (error) => {
        console.error('Error al eliminar el favorito:', error);
      },
    });
  }

  ngOnInit(): void {}
}
