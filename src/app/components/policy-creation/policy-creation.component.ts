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
  userRole!: string;


  constructor(
    private fb: FormBuilder,
    private policyService: PolicyserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';

    this.policyForm = this.fb.group({
      policyNumber: ['', Validators.required],
      policyName: ['', Validators.required],
      policyDescription: ['', Validators.required],
      policyType: ['', Validators.required],
      claimSettlementRatio: ['', [Validators.required, Validators.min(0)]],
      entryAge: ['', [Validators.required, Validators.min(1)]],
      annualPremiumRange: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      const policyData = {
        ...this.policyForm.value,
        claimSettlementRatio: this.policyForm.value.claimSettlementRatio.toString()   
      };
      this.policyService.addPolicyCall(policyData).subscribe(
        (response: any) => {
          console.log('Policy created successfully', response);
          this.router.navigate(['/dashboard', this.userRole, 'policy']);
        },
        (error: any) => {
          console.error('Error creating policy', error);
        }
      );
    }
  }
}
