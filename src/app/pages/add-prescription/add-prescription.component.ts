import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-prescription',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-prescription.component.html',
  styleUrl: './add-prescription.component.css',
})
export class AddPrescriptionComponent {
  prescription = {
    prescriptionName: '',
    description: '',
    prescriptionDetails: [
      {
        medication: '',
        dosage: '',
      },
    ],
  };
  constructor(private masterService: MasterService, private router: Router) {}

  addDetail(): void {
    this.prescription.prescriptionDetails.push({
      medication: '',
      dosage: '',
    });
  }

  removeDetail(index: number): void {
    this.prescription.prescriptionDetails.splice(index, 1);
  }

  addPrescription(): void {
    this.masterService.addPrescription(this.prescription).subscribe(
      (response: any) => {
        alert('Prescription added successfully!');
        this.router.navigate(['/prescription-list']);
      },
      (error) => {
        console.error('Error adding prescription:', error);
        alert('Failed to add prescription.');
      }
    );
  }

  resetForm(): void {
    this.prescription = {
      prescriptionName: '',
      description: '',
      prescriptionDetails: [
        {
          medication: '',
          dosage: '',
        },
      ],
    };
  }
  goBack(): void {
    this.router.navigate(['/prescription-list']);
  }
}
