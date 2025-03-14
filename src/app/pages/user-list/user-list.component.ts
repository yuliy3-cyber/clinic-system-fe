import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [],
})
export class UserListComponent implements OnInit {
  masterServ = inject(MasterService);
  router = inject(Router);
  users: any[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.masterServ.getAllUsers().subscribe(
      (response: any) => {
        if (response.success) {
          this.users = response.data;
          console.log(response.data);
        } else {
          alert(response.message || 'Failed to load users');
        }
      },
      (error) => {
        alert('Failed to load users');
      }
    );
  }

  editUser(user: any) {
    this.router.navigate(['/edit-user', user.userId]);
  }

  addUser() {
    this.router.navigateByUrl('/new-user');
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.masterServ.deleteUser(userId).subscribe(
        (response: any) => {
          if (response.success) {
            this.loadUsers();
          } else {
            alert(response.message || 'Failed to delete user');
          }
        },
        (error) => {
          alert('Failed to delete user');
        }
      );
    }
  }
}
