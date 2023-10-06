import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../Services/movies.service';
import { Movie } from '../Interfaces/movie';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  searchResults: Movie[] = [];

  constructor(
    private movieServicio: MoviesService,
    public shareService: SharedService
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      console.log(this.searchResults)
      this.shareService.mostrarPopular= true
      this.shareService.mostrarResultado=false
      return;
    }

    this.shareService.mostrarPopular=false
    this.shareService.mostrarResultado=true
    this.movieServicio.buscarPelicula(this.searchTerm).subscribe((data) => {
      // Obtener la lista de películas favoritas
      this.movieServicio.getFavoriteList().subscribe({
        next: (data2: number[]) => {
          const favoritas = data2;

          // Agregar la propiedad 'favorite' a las películas encontradas
          this.searchResults = data.map((movie) => ({
            ...movie,
            favorite: favoritas.includes(movie.id),
          }));
        },
        error: (e) => {
          console.log('Error en conseguir la lista de favoritos' + e);
        },
      });
    });
  }
}
