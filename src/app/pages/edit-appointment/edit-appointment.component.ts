import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
  imports: [FormsModule, CommonModule],
})
export class EditAppointmentComponent implements OnInit {
  appointmentObj: any = {
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
  };
  patients: any[] = [];
  doctors: any[] = [];
  appointmentId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService
  ) {
    this.appointmentId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadAppointmentDetails();
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

  loadAppointmentDetails(): void {
    this.masterService
      .getAppointmentById(this.appointmentId)
      .subscribe((response: any) => {
        this.appointmentObj = response.data || response; // Adjust this line based on the actual API response structure
        console.log(this.appointmentObj);
      });
  }

  onEditAppointment(): void {
    this.masterService
      .updateAppointment(this.appointmentId, this.appointmentObj)
      .subscribe(
        (response: any) => {
          // Handle successful appointment update
          alert('Appointment updated successfully!');
          this.router.navigateByUrl('/appointment-list');
        },
        (error) => {
          // Handle error
          alert('Failed to update appointment');
        }
      );
  }
}
