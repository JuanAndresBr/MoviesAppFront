import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FavoritasComponent } from './favoritas/favoritas.component';
import { DetallesMovieComponent } from './detalles-movie/detalles-movie.component';

const routes: Routes = [
  {path:"details/:id_movie",component: DetallesMovieComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
