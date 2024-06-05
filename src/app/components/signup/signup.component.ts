import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  userRole:string=''
  constructor(private formBuilder: FormBuilder,private dataservice:DataserviceService) { }

  ngOnInit(): void {
    this.dataservice.userRoleState.subscribe(res=>this.userRole=res)
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  handleSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const { fullname, email, mobileNumber, dateOfBirth, address, password } = this.signupForm.value;
    // 
  }
}
