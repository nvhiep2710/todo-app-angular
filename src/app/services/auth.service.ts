import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private nameHeader = new BehaviorSubject<string>('');
  public currentName = this.nameHeader.asObservable();

  private _registerUrl = 'http://localhost:3000/register';
  private _loginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    return localStorage.getItem('user');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
