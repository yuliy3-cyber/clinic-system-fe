import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css'],
  imports: [CommonModule],
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: any[] = [];
  selectedPrescription: any = null;

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.getPrescriptions();
  }

  getPrescriptions(): void {
    this.masterService.getPrescriptions().subscribe(
      (response: any) => {
        this.prescriptions = response.data || response; // Adjust based on actual API response structure
      },
      (error) => {
        console.error('Error fetching prescriptions:', error);
      }
    );
  }

  selectPrescription(prescription: any): void {
    this.selectedPrescription = prescription;
  }

  redirectToAddPage(): void {
    this.router.navigate(['/add-prescription']);
  }
}
