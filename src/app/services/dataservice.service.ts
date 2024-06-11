import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor() { }
  private userRole=new BehaviorSubject('')
  userRoleState=this.userRole.asObservable();

  private premium=new BehaviorSubject({})
  premiumValue=this.userRole.asObservable();

  private drawerState = new BehaviorSubject(false);
  currDrawerState = this.drawerState.asObservable();

  changeUserRole(value:string){
    this.userRole.next(value);
  }

  changePremiumValue(value:object){
    this.premium.next(value);
  }
  
  changeDrawerState(state: boolean) {
    this.drawerState.next(state)
  }}
