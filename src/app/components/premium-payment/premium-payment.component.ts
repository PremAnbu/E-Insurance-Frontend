import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyserviceService } from 'src/app/services/policyservice.service';

@Component({
  selector: 'app-premium-payment',
  templateUrl: './premium-payment.component.html',
  styleUrls: ['./premium-payment.component.scss']
})
export class PremiumPaymentComponent implements OnInit {

  insuranceForm!: FormGroup;
  frequency: string = 'yearly';
  policyTerms: number[] = [];
  personalDetail:any;


  constructor(private fb: FormBuilder,private policyService:PolicyserviceService) {}

  ngOnInit(): void {
    this.insuranceForm = this.fb.group({
      sumAssured: [10000000, [Validators.required, Validators.min(5000000)]],
      policyTerm: ['53 Years', Validators.required],
      wholeLife: [false],
      premiumPayingOption: ['Regular', Validators.required],
      premiumPayingTerm: ['53 Years', Validators.required]
    });
    this.generatePolicyTerms(20, 60);
    this.personalDetail =this.policyService.addPersonalDetails
    
  }

  setFrequency(frequency: string): void {
    this.frequency = frequency;
  }

  generatePolicyTerms(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.policyTerms.push(i);
    }
  }

  onSubmit(): void {
    if (this.insuranceForm.valid) {
      console.log('Form Submitted', this.insuranceForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
