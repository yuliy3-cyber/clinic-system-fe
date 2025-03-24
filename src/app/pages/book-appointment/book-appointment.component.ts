import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  appointmentObj: any = {
    patientId: localStorage.getItem('userId'), // Get patientId from localStorage
    doctorId: '',
    appointmentDate: '',
  };
  doctors: any[] = [];

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.masterService.getUsersByRole('Doctor').subscribe((response: any) => {
      this.doctors = response.data || response; // Adjust this line based on the actual API response structure
    });
  }

  onBookAppointment(form: NgForm): void {
    if (form.valid && this.appointmentObj.doctorId) {
      this.masterService.addAppointment(this.appointmentObj).subscribe(
        (response: any) => {
          // Handle successful appointment booking
          alert('Appointment booked successfully!');
          this.router.navigateByUrl('/appointment-list');
        },
        (error) => {
          // Handle error
          alert('Failed to book appointment');
        }
      );
    } else {
      if (!this.appointmentObj.doctorId) {
        alert('Please select a doctor.');
      }
    }
  }
}
