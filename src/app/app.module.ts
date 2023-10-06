import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { RegisterComponent } from './register/register.component';
import { FavoritasComponent } from './favoritas/favoritas.component';
import { SearchComponent } from './search/search.component';
import { DetallesMovieComponent } from './detalles-movie/detalles-movie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from './shared.service';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    RegisterComponent,
    FavoritasComponent,
    SearchComponent,
    DetallesMovieComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
