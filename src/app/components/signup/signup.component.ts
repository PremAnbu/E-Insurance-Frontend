import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userRole: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataservice: DataserviceService,
    private userService: UserserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: ['']  // Added location form control, but it will be used only for agents
    });

    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.userRole = params.role;
      this.dataservice.changeUserRole(this.userRole);
    });
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  handleSignup() {
    if (this.signupForm.invalid) {
      console.log("Form is invalid");return;
    }
    const { fullname, email, password, location } = this.signupForm.value;
    let requestBody: any = {
      fullName: fullname,
      emailId: email,
      password: password,
      role: this.userRole,
    };
    if (this.userRole === 'agent') {
      requestBody.location = location;
    }

    switch (this.userRole) {
      case 'admin':
        this.userService.adminRegistrationCall(requestBody).subscribe({
          next: (res:any) => {
            console.log('Registration successful', res);
            this.router.navigate(['/dashboard', this.userRole]); // Replace with your desired path
          },
          error: (err:any) => {
            console.error('Registration error', err);
            alert(`Registration failed: ${err.message}`); // Display a user-friendly error message
          }
        });
        break;

      case 'agent':
        this.userService.agentRegistrationCall(requestBody).subscribe({
          next: (res:any) => {
            console.log('Registration successful', res);
            this.router.navigate(['/dashboard', this.userRole]); // Replace with your desired path
          },
          error: (err:any) => {
            console.error('Registration error', err);
            alert(`Registration failed: ${err.message}`); // Display a user-friendly error message
          }
        });
        break;

      case 'employee':
        this.userService.employeeRegistrationCall(requestBody).subscribe({
          next: (res:any) => {
            console.log('Registration successful', res);
            this.router.navigate(['/dashboard', this.userRole]); // Replace with your desired path
          },
          error: (err:any) => {
            console.error('Registration error', err);
            alert(`Registration failed: ${err.message}`); // Display a user-friendly error message
          }
        });
        break;

      case 'customer':
        this.userService.customerRegistrationCall(requestBody).subscribe({
          next: (res:any) => {
            console.log('Registration successful', res);
            this.router.navigate(['/dashboard', this.userRole]); // Replace with your desired path
          },
          error: (err:any) => {
            console.error('Registration error', err);
            alert(`Registration failed: ${err.message}`); // Display a user-friendly error message
          }
        });
        break;

      default:
        console.log("API call is not done for unrecognized roles");
        break;
    }
  }
}
