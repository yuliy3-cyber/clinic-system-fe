import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  userRole: string | null = null;
  selectedStatus: string = '';
  search: string = '';
  from: string = '';
  to: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalAppointments: number = 0;

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.loadAppointments();
  }

  loadAppointments(): void {
    const requestParams: any = {
      status: Number(this.selectedStatus),
      search: this.search,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    if (this.from) {
      requestParams.from = this.from;
    }

    if (this.to) {
      requestParams.to = this.to;
    }

    this.masterService
      .getAppointments(requestParams)
      .subscribe((response: any) => {
        this.appointments = response.data.items || response.items; // Adjust based on actual API response structure
        this.totalAppointments =
          response.data.totalRecords || response.totalRecords; // Adjust based on actual API response structure
        this.filterAppointments();
      });
  }

  filterAppointments(): void {
    if (this.selectedStatus) {
      this.filteredAppointments = this.appointments.filter(
        (appointment) => appointment.status === Number(this.selectedStatus)
      );
    } else {
      this.filteredAppointments = this.appointments;
    }
  }

  newAppointment(): void {
    this.router.navigateByUrl('/new-appointment');
  }

  editAppointment(appointment: any): void {
    this.router.navigate(['/edit-appointment', appointment.appointmentId]);
  }

  viewAppointmentDetails(appointmentId: number): void {
    this.router.navigate(['/appointment-details', appointmentId]);
  }

  changeStatus(appointmentId: number, status: number): void {
    const model = { appointmentId, status };
    this.masterService.changeStatus(model).subscribe(
      (response: any) => {
        // Handle successful status change
        alert('Status changed successfully!');
        this.loadAppointments(); // Reload appointments after status change
      },
      (error) => {
        // Handle error
        alert('Failed to change status');
      }
    );
  }

  deleteAppointment(appointmentId: number): void {
    this.masterService.deleteAppointment(appointmentId).subscribe(() => {
      this.loadAppointments(); // Reload appointments after deletion
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Unconfirmed';
      case 2:
        return 'Upcoming';
      case 3:
        return 'Completed';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page on search
    this.loadAppointments();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadAppointments();
  }

  getPagesArray(): number[] {
    return Array(Math.ceil(this.totalAppointments / this.pageSize))
      .fill(0)
      .map((x, i) => i + 1);
  }
}
