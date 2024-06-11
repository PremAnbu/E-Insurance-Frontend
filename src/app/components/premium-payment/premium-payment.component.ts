import { HttpserviceService } from 'src/app/services/httpservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { PolicyserviceService } from 'src/app/services/policyservice.service';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-premium-payment',
  templateUrl: './premium-payment.component.html',
  styleUrls: ['./premium-payment.component.scss']
})
export class PremiumPaymentComponent implements OnInit {

 calcPremium:boolean=false
  insuranceForm!: FormGroup;
  frequency: string = 'Annual'; // Default frequency
  policyTerms: number[] = [];
  personalDetail: any;
  policyId!: number;

  premiumAmount!:number;
  coverageAmount!: number;
  tenure!: number;
  premiumType!: string;


  constructor(private fb: FormBuilder, private policyService: PolicyserviceService
    ,private route: ActivatedRoute,private httpserviceService:HttpserviceService
    ,private dataService:DataserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.policyId = +params['policyId'];
    });

    this.insuranceForm = this.fb.group({
      sumAssured: ['', Validators.required],
      policyTerm: ['', Validators.required],
      premiumType: ['', Validators.required] // Added premiumType field
    });
    this.generatePolicyTerms(20, 60);
    this.personalDetail = this.policyService.addPersonalDetails;
  }

  setFrequency(frequency: string): void {
    this.frequency = frequency;
    // Ensure form value is updated when frequency is set
    this.insuranceForm.patchValue({ premiumType: frequency });
  }

  generatePolicyTerms(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.policyTerms.push(i);
    }
  }

  onSubmit(): void {
    
    if (this.insuranceForm.valid) {
      const formValue = this.insuranceForm.value;
      const payload = {
        policyId: this.policyId, // Example PolicyId, replace with actual value if needed
        coverageAmount: formValue.sumAssured,
        tenure: formValue.policyTerm,
        premiumType: formValue.premiumType
      };
      this.policyId = this.policyId;
      this.coverageAmount = formValue.sumAssured,
      this.tenure = formValue.policyTerm,
      this.premiumType = formValue.premiumType

      this.dataService.changePremiumValue(payload);
      console.log('Form Submitted', payload);
      
      this.httpserviceService.premiumCalculation(payload).subscribe(
        (response: any) => {this.premiumAmount=response.data
          console.log('Personal details added successfully', response);  
        },
        (error: any) => { 
          console.error('Error adding personal details', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
    this.calcPremium=true
  }

  purchasePolicy(){
    if (this.insuranceForm.valid) {
      const formValue = this.insuranceForm.value;
      const payload = {
        policyId: this.policyId, // Example PolicyId, replace with actual value if needed
        coverageAmount: formValue.sumAssured,
        tenure: formValue.policyTerm,
        premiumType: formValue.premiumType,
        premiumAmount:this.premiumAmount
      };
    this.httpserviceService.purchasePolicy(payload).subscribe(res=>{
    
    })
          // this.router.navigate(['dashboard', this.userRole, 'premium'],{ queryParams: { policyId: this.policyId } });
  }
  }
}
