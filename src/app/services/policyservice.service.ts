import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyserviceService {

  private personaldetailList:any;

  private policyObj=new BehaviorSubject<any[]>([]);
  AllPoliciesList= this.policyObj.asObservable();

  // private personalObj=new BehaviorSubject<any[]>([]);
  // personalList= this.policyObj.asObservable();

  constructor(private http:HttpserviceService) { }


  //--------------------------------------------------------
  getAllPolicies(policy: any[]) {
    this.policyObj.next(policy);
  }
  addAllpersonal(detail: object) {
    this.personaldetailList=detail
  }
//   addAllpersonal(policy: any[]) {
//     this.personalObj.next(policy);
//   }
//  //-----------------------------------------------------------
  //api calls
  addPolicyCall(body:object)
  {
    return this.http.policyCreationApi(body);
  }
  getAllPoliciesCall()
  {
    return this.http.getAllPoliciesApi();
  }
  addPersonalDetails(details: any) {
    return this.http.addPersonalDetails(details);
  }
}