import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.masterService.getAppointments().subscribe((response: any) => {
      this.appointments = response.data || response; // Adjust based on actual API response structure
    });
  }

  newAppointment(): void {
    this.router.navigateByUrl('/new-appointment');
  }

  editAppointment(appointment: any): void {
    this.router.navigate(['/edit-appointment', appointment.appointmentId]);
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
        return 'Pending';
      case 3:
        return 'Completed';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
