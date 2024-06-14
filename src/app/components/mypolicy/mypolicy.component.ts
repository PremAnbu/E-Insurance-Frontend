import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-mypolicy',
  templateUrl: './mypolicy.component.html',
  styleUrls: ['./mypolicy.component.scss']
})
export class MypolicyComponent implements OnInit {

  purchaseList: any[] = [];
  purchaseId!: number;
  paymentType: string = ''; 
  paymentForm!: FormGroup;
  policyId!: number;
  payload!: object;
  paymentId!:number;


  constructor(private httpService: HttpserviceService,    private fb: FormBuilder
  ,private route:Router) { }

  ngOnInit(): void {
    this.allPurchasePolicy()
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required]
    });
  }
allPurchasePolicy(){
  this.httpService.getAllPurchaseApi().subscribe(res => {
    this.purchaseList = res.data;
  });
}
  cancelPolicy(policy: any): void {
         this.httpService.policyCancel(policy.policyId).subscribe(res=>{})
         location.reload();
         console.log('Cancel policy:', policy);
  }

  makePayment(policy: any): void {
    // Implement make payment functionality
    this.purchaseId=policy.purchaseId;
    this.policyId=policy.policyId;
    console.log('Make payment for policy:', policy);
  }

  setPaymentType(paymentType: string): void {
    this.paymentType = paymentType;
    this.paymentForm.patchValue({ paymentType });
  }


  onSubmit(): void {
    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;
      this.payload = {
        purchaseId: this.purchaseId, // Example PolicyId, replace with actual value if needed
        paymentMethod: formValue.paymentType
      };
      console.log('Form Submitted', this.payload);
      // Example API call with the payload
      this.httpService.paymentProcess(this.payload).subscribe(
        (response: any) => { this.paymentId=response.data
          console.log('Payment details submitted successfully', response);
          this.route.navigate(['receipt'], { queryParams: { paymentId: this.paymentId } });
        },
        (error: any) => {
          console.error('Error submitting payment details', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  // receipt(){
  // }
  
}
