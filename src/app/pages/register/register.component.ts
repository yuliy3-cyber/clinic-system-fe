import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [DatePipe],
})
export class RegisterComponent {
  masterServ = inject(MasterService);
  router = inject(Router);
  datePipe = inject(DatePipe);
  userObj: any = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    phoneNumber: '',
  };

  onRegister() {
    if (this.userObj.password !== this.userObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Format the dateOfBirth to 'dd/MM/yyyy'
    const formattedDateOfBirth = this.datePipe.transform(
      this.userObj.dateOfBirth,
      'dd/MM/yyyy'
    );

    // Create a new object excluding confirmPassword
    const userToRegister = {
      email: this.userObj.email,
      password: this.userObj.password,
      fullName: this.userObj.fullName,
      dateOfBirth: formattedDateOfBirth,
      gender: this.userObj.gender,
      address: this.userObj.address,
      phoneNumber: this.userObj.phoneNumber,
    };

    this.masterServ.register(userToRegister).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          alert(response.message || 'Registration failed');
        }
      },
      (error) => {
        alert('Registration failed');
      }
    );
  }
}
