import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyserviceService } from 'src/app/services/policyservice.service';

@Component({
  selector: 'app-policy-creation',
  templateUrl: './policy-creation.component.html',
  styleUrls: ['./policy-creation.component.scss']
})
export class PolicyCreationComponent implements OnInit {

  policyForm!: FormGroup;
  policyTerms: number[] = [1, 5, 10, 15, 20]; // Example terms in years
  frequency: string = 'yearly';

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      policyName: ['', Validators.required],
      policyCode: ['', Validators.required],
      policyDescription: ['', Validators.required],
      sumAssured: ['', [Validators.required, Validators.min(1)]],
      policyTerm: ['', Validators.required],
      premiumAmount: ['', [Validators.required, Validators.min(1)]],
      entryAge: ['', [Validators.required, Validators.min(1)]]
    });
  }

  setFrequency(frequency: string): void {
    this.frequency = frequency;
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      const policyData = {
        ...this.policyForm.value,
        premiumFrequency: this.frequency
      };

      // this.policyService.createPolicy(policyData).subscribe(
      //   (response: any) => {
      //     console.log('Policy created successfully', response);
      //     this.router.navigate(['/dashboard', 'admin', 'policies']);
      //   },
      //   (error: any) => {
      //     console.error('Error creating policy', error);
      //   }
      // );
    }
  }

}
