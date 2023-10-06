import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + 'Login/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiUrl}Usuarios`);
  }
  addUser(request: Login): Observable<Login> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Login>(`${this.apiUrl}AddUser`, request, { headers });
  }
}
