import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  imports: [FormsModule, HttpClientModule],
})
export class EditUserComponent implements OnInit {
  masterServ = inject(MasterService);
  route = inject(ActivatedRoute);
  router = inject(Router);
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

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(userId);
  }

  loadUser(userId: number) {
    if (userId) {
      this.masterServ.getUserById(userId).subscribe(
        (response: any) => {
          if (response.success) {
            this.userObj = response.data;
          } else {
            alert(response.message || 'Failed to load user');
          }
        },
        (error) => {
          alert('Failed to load user');
        }
      );
    }
  }

  toggleStatus(event: any) {
    this.userObj.status = event.target.checked ? 1 : 0;
  }

  onUpdateUser() {
    this.masterServ.updateUser(this.userObj).subscribe(
      (response: any) => {
        if (response.success) {
          alert('User updated successfully!');
          this.router.navigateByUrl('/user-list');
        } else {
          alert(response.message || 'Failed to update user');
        }
      },
      (error) => {
        alert('Failed to update user');
      }
    );
  }
}
