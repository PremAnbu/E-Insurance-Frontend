import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  private apiUrl: string = "https://localhost:7062/api";

  private authHeader = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  constructor(private http: HttpClient) {}

  loginApi(email: string, password: string, role: string): Observable<any> {    
    return this.http.post<any>(`${this.apiUrl}/registration/login`, {"emailId":email,"password":password,"role":role });
  }

  adminRegistration(adminData: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration/admin`, adminData);
  }

  agentRegistration(agentData: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration/agent`, agentData);
  }

  employeeRegistration(employeeData: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration/employee`, employeeData);
  }

  customerRegistration(customerData: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration/customers`, customerData);
  }
// ---------
  policyCreationApi(policyData:object):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/Policies`,policyData)
  }
  getAllPoliciesApi():Observable<any>
  {
    return this.http.get(`${this.apiUrl}/Policies`)
  }
  // -------

  addPersonalDetails(details: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/purchase/customerDetails`, details, { headers: this.authHeader });
  }
}
