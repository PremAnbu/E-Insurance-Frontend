import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormVisible = false;
  loginForm!: FormGroup;
  userRole:string=''
  token:string=''

  constructor(private formBuilder: FormBuilder,private route:Router
    ,private dataservice:DataserviceService, private userService:UserserviceService) 
  
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
    const { email, password } = this.loginForm.controls;
    console.log(email.value, password.value,this.userRole);
    
    localStorage.clear();

    this.userService.loginApi(email.value, password.value,this.userRole).subscribe((res:any) => {
      this.token = res.data;
    localStorage.setItem("authToken", res.data);
    localStorage.setItem("role",this.userRole)
  })
    this.route.navigate(['/',this.userRole])
    console.log('user role',this.userRole);
  }
  handleRegister()
  {
    this.dataservice.changeUserRole(this.userRole);
    this.route.navigate(['signup',this.userRole])
  }

}
