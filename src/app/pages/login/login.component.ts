import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, RouterLink],
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
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role); // Store the user's role
            localStorage.setItem('userId', response.data.userId); // Store the user's role
            this.router.navigateByUrl('/home');
          } else {
            alert(response.message || 'Failed to login');
          }
        },
        (error: any) => {
          // Handle login error
          console.log(error.message);
          alert(error.error.message || 'Failed to login');
        }
      );
  }
}
