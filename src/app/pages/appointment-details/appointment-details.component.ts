import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css'],
})
export class AppointmentDetailsComponent implements OnInit {
  appointmentId: number;
  appointment: any;
  diagnosis: string = '';
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService
  ) {
    this.appointmentId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.getAppointmentDetails();
  }

  getAppointmentDetails(): void {
    this.masterService.getAppointmentById(this.appointmentId).subscribe(
      (response: any) => {
        this.appointment = response.data || response; // Adjust based on actual API response structure
        this.diagnosis = this.appointment.diagnosis || ''; // Initialize diagnosis
      },
      (error) => {
        console.error('Error fetching appointment details', error);
      }
    );
  }

  updateDiagnosis(): void {
    const updatedAppointment = {
      ...this.appointment,
      diagnosis: this.diagnosis,
    };
    this.masterService
      .updateAppointment(this.appointmentId, updatedAppointment)
      .subscribe(
        (response: any) => {
          alert('Diagnosis updated successfully!');
        },
        (error) => {
          console.error('Error updating diagnosis', error);
          alert('Failed to update diagnosis');
        }
      );
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

  goBack(): void {
    this.router.navigate(['/appointment-list']);
  }
}
