import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public mostrarPopular: boolean=true;
  public mostrarResultado: boolean=true;
  public mostrarFavoritas: boolean=false;
  constructor() { }
}
