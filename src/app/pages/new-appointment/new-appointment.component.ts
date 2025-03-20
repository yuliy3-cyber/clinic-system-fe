import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-new-appointment',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css',
})
export class NewAppointmentComponent implements OnInit {
  appointmentObj: any = {
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
  };
  patients: any[] = [];
  doctors: any[] = [];
  router = inject(Router);
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.fetchUsersByRole('Patient');
    this.fetchUsersByRole('Doctor');
  }

  fetchUsersByRole(role: string): void {
    this.masterService.getUsersByRole(role).subscribe((response: any) => {
      const data = response.data || response; // Adjust this line based on the actual API response structure
      if (role === 'Patient') {
        this.patients = Array.isArray(data) ? data : [];
      } else if (role === 'Doctor') {
        this.doctors = Array.isArray(data) ? data : [];
      }
    });
  }

  onAddAppointment() {
    this.masterService.addAppointment(this.appointmentObj).subscribe(
      (response: any) => {
        // Handle successful appointment addition
        alert('Appointment added successfully!');
        this.router.navigateByUrl('/appointment-list');
      },
      (error) => {
        // Handle error
        alert('Failed to add appointment');
      }
    );
  }
}
