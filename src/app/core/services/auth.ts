import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http=inject(HttpClient);

  login(data:any){
    return this.http.post<any>(`${environment.apiUrl}/accounts/login/`,data);
  }

  register(data:any){
    return this.http.post(`${environment.apiUrl}/accounts/register/`,data);
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!this.getToken();
  }
}
