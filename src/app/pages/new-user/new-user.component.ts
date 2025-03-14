import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-new-user',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  masterServ = inject(MasterService);

  userObj: any = {
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: true,
    address: '',
    phoneNumber: '',
    status: 0, // Default to Inactive
    role: 'Patient', // Default to Patient
  };
  router = inject(Router);
  http = inject(HttpClient);

  toggleStatus(event: any) {
    this.userObj.status = event.target.checked ? 1 : 0;
  }

  onAddUser() {
    this.masterServ.createNewUser(this.userObj)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigateByUrl('/user-list');
          } else {
            alert(response.message);
          }
        },
        (error) => {
          // Handle error
          alert(error.message);
        }
      );
  }
}
