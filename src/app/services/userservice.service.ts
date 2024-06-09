import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpserviceService) { }

  loginApi(email: string, password: string,role:string){
    return this.http.loginApi(email, password,role)
  }

  adminRegistrationCall(adminData: object) {
    return this.http.adminRegistration(adminData);
  }

  agentRegistrationCall(agentData: object) {
    return this.http.agentRegistration(agentData);
  }

  employeeRegistrationCall(employeeData: object) {
    return this.http.employeeRegistration(employeeData);
  }

  customerRegistrationCall(customerData: object) {
    return this.http.customerRegistration(customerData);
  }

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getNameId(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
    
    const decodedToken = this.getDecodedToken(token);
    return decodedToken ? decodedToken.nameid : null;
  }
}
