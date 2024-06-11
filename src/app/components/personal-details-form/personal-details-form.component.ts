import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyserviceService } from 'src/app/services/policyservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  agents: string[] = ['Agent1  (Location)', 'Agent2  (Location)', 'Agent3  (Location)'];
  age!: number;
  policyId!: number;
  userRole!: string;


  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private policyService: PolicyserviceService,
    private userService: UserserviceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.policyId = +params['policyId'];
    });
      this.userRole = localStorage.getItem('role') || '';

    this.personalDetailsForm = this.fb.group({
      annualIncome: ['', Validators.required],
      dob: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      agent: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue],
      address: ['', Validators.required]
    });

    this.personalDetailsForm.get('dob')?.valueChanges.subscribe(value => {
      if (value) {
        this.age = this.calculateAge(value);
      }
    });

    
  }

  calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      console.log(this.personalDetailsForm.value);
      const nameId = this.userService.getNameId();
      console.log("nameId",nameId);
      

      const personalDetailsPayload = {
        // customerId: nameId,
        policyId: this.policyId,
        agentId: 1,
        annualIncome: this.personalDetailsForm.value.annualIncome,
        firstName: this.personalDetailsForm.value.firstName,
        lastName: this.personalDetailsForm.value.lastName,
        gender: this.personalDetailsForm.value.gender,
        dateOfBirth: new Date(this.personalDetailsForm.value.dob).toISOString(),
        mobileNumber: this.personalDetailsForm.value.mobileNumber,
        address: this.personalDetailsForm.value.address
      };

      console.log(personalDetailsPayload);

      this.policyService.addPersonalDetails(personalDetailsPayload).subscribe(
        (response: any) => {
          console.log('Personal details added successfully', response);
          this.policyService.addPersonalDetails(personalDetailsPayload);
          console.log(this.userRole);
          
          this.router.navigate(['premium', this.userRole], { queryParams: { policyId: this.policyId } });
        },
        (error: any) => { 
          console.error('Error adding personal details', error);
        }
      );
    }
  }
}
