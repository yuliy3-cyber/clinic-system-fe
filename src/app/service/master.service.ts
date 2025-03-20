import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'https://localhost:7293/api';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  createNewUser(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/AddUser`, obj);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/User/GetAllUsers`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/User/GetUserById/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/User/UpdateUser/${user.userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/User/DeleteUser/${userId}`);
  }

  getUsersByRole(role: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/User/GetUsersByRole/${role}`);
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Appointment/AddAppointment`,
      appointment
    );
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Appointment/GetAllAppointments`);
  }

  getAppointmentById(appointmentId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Appointment/GetAppointmentById/${appointmentId}`
    );
  }

  updateAppointment(appointmentId: number, appointment: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/Appointment/UpdateAppointment/${appointmentId}`,
      appointment
    );
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/Appointment/DeleteAppointment/${appointmentId}`
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/Login`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/Register`, user);
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
