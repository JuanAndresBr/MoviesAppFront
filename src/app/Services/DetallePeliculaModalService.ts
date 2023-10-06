import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetallesMovieComponent } from '../detalles-movie/detalles-movie.component';

@Injectable({
  providedIn: 'root',
})
export class DetallePeliculaModalService {
  constructor(private dialog: MatDialog) {}

  abrirDetallePeliculaModal(componente: any, data: any): void {
    this.dialog.open(DetallesMovieComponent, {
      width: '600px', // Personaliza el ancho y otras opciones según tus necesidades
      data: data.pelicula,
    });
  }
}

