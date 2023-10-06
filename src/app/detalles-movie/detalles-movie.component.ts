import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../Interfaces/movie';

@Component({
  selector: 'app-detalles-movie',
  templateUrl: './detalles-movie.component.html',
  styleUrls: ['./detalles-movie.component.css']
})
export class DetallesMovieComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie) {
  }

}
