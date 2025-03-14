import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userObj: any = {
    email: '',
    password: '',
  };
  router = inject(Router);
  http = inject(HttpClient);
  onLogin() {
    this.http
      .post('https://localhost:7293/api/Auth/Login', this.userObj)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.data);
          this.router.navigateByUrl('/appointment-list');
        },
        (error) => {
          // Handle login error
          alert('Invalid credentials');
        }
      );
  }
}
