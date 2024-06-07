import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormVisible = false;
  loginForm!: FormGroup;
  userRole:string=''

  constructor(private formBuilder: FormBuilder,private route:Router,private dataservice:DataserviceService) 
  
  { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  showLoginForm(): void {
    this.loginFormVisible = true;
  }

  login(): void {
    console.log(this.loginControl);
    if(this.loginForm.invalid) return
    const {email, password} = this.loginForm.value
    localStorage.clear();
    localStorage.setItem("Role",this.userRole)
    this.route.navigate([this.userRole])
    console.log('user role',this.userRole);
    
  }
  handleRegister()
  {
    this.dataservice.changeUserRole(this.userRole);
    this.route.navigate(['signup'])
  }

}
