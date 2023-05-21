import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appURL: string;
  private apiURL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.appURL = environment.endpoint;
    this.apiURL = 'api/Login/Auth';
  }

  //hace la peticion al servidor
  login(user) {
    return this.http.post<any>(`${this.appURL}${this.apiURL}`, user);
  }
  //verifica si el usuario esta logeado
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  //cierra la sesion
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
