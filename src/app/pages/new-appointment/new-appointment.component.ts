import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css',
})
export class NewAppointmentComponent {
  appointmentObj: any = {
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
  };
  router = inject(Router);
  http = inject(HttpClient);

  onAddAppointment() {
    this.http
      .post(
        'https://localhost:7293/api/Appointment/AddAppointment',
        this.appointmentObj
      )
      .subscribe(
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
