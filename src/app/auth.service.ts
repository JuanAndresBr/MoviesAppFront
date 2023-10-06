import { Injectable } from '@angular/core';
import { UsuarioService } from './Services/usuario.service';
import { Login } from './Interfaces/login';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  currentUser: Login={id:0,username:"",nam:"", pass:""};
  listaUsuarios: Login[] = [];

  constructor(private usuarioServicio: UsuarioService, private router: Router) {}

  async login(username: string, password: string): Promise<void> {
    try {
      const data = (await this.usuarioServicio.getUsers().toPromise()) || [];
      this.listaUsuarios = data;

      // Lógica de autenticación 
      const user = this.listaUsuarios.find(
        (u) => u.username === username && u.pass === password
      );
      if (user) {
        this.currentUser = user;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.currentUser ={id:0,username:"",nam:"", pass:""};
      }
    } catch (error) {
      // Manejar errores de la llamada al servicio aquí
      console.error('Error en la autenticación:', error);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = {id:0,username:"",nam:"", pass:""};

  }
}
