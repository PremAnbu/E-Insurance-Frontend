import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnInit {
  personalDetailsForm! : FormGroup;
  agents: string[] = ['Agent1', 'Agent2', 'Agent3'];
  age! : number;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      annualIncome: ['', Validators.required],
      dob: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      emailId: ['', [Validators.required, Validators.email]],
      agent: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue]
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
      // Handle form submission
      this.router.navigate(['/next-page']); // Adjust the navigation as needed
    }
  }
}
