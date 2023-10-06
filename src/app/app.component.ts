import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'; 
import { MoviesService } from './Services/movies.service';
import { Movie } from './Interfaces/movie';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listaMovies: Movie[] = [];
  listFavoritesMovies: any[] = [];
  formularioIngreso: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private movieServicio: MoviesService,
    public sharedService: SharedService
  ) {
    this.formularioIngreso = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login(): Promise<void> {
    try {
      await this.authService.login(
        this.formularioIngreso.value.username,
        this.formularioIngreso.value.password
      );

      // Si la autenticación es exitosa, navega a la página deseada
      if (this.authService.isLoggedIn) {
        this.obtenerFavoriteMovies();
        this.obtenerPeliculasPopulares();
        this.router.navigate(['/']);
      } else {
        alert('Contraseña y/o usuario incorrectos');
      }
      this.formularioIngreso.reset();
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error('Error en el inicio de sesión:', error);
    }
  }

  //manejo entre componentes
  mostrarComponenteFavoritas() {

    this.sharedService.mostrarResultado=false;
    this.sharedService.mostrarPopular=false;
    this.sharedService.mostrarFavoritas=true;
  }
  mostrarComponentePopulares() {
    this.sharedService.mostrarPopular=true;
    this.sharedService.mostrarResultado=false;
    this.sharedService.mostrarFavoritas=false;
    this.obtenerFavoriteMovies();
    this.obtenerPeliculasPopulares();
  }
  obtenerFavoriteMovies() {
    this.movieServicio.getFavoriteList().subscribe({
      next: (data) => {
        this.listFavoritesMovies = data;
      },
      error: (e) => {
        console.log('Error en conseguir la lista de favoritos' + e);
      },
    });
  }
  obtenerPeliculasPopulares() {
    this.movieServicio.getPopularMovies().subscribe({
      next: (data) => {
        this.listaMovies = data.map((movie) => ({
          ...movie,
          favorite: this.listFavoritesMovies.includes(movie.id),
        }));
      },
      error: (e) => {},
    });
  }
  //Cerrar sesión
  logOut() {
    this.authService.logout();
    this.listaMovies = [];
    this.listFavoritesMovies = [];
    this.sharedService.mostrarFavoritas = false;
    this.sharedService.mostrarPopular = true;
    this.router.navigate(['/']);
  }
}
