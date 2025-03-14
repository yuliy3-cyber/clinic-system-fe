import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'https://localhost:7293/api/User';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  createNewUser(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddUser`, obj);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllUsers`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserById/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateUser/${user.userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteUser/${userId}`);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Auth/Login`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
        }
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
