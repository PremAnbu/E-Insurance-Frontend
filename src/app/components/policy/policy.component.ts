import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { PolicyserviceService } from 'src/app/services/policyservice.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  items = Array(5);
  userRole: string = '';
  policiesList: any[] = [];

  constructor(
    private dataService: DataserviceService, 
    private policyService: PolicyserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.userRoleState.subscribe((res: any) => {
      this.userRole = res;
      console.log('UserRole:', res);
    });

    this.policyService.getAllPoliciesCall().subscribe(res => {
      this.policiesList = res.data.map((policy: any) => ({ ...policy, premiumDetails: false }));
      console.log("get all policies", res.data);
      this.policyService.getAllPolicies(res.data);
    });
  }

  learnMore(item: any) {
    item.premiumDetails = !item.premiumDetails;
  }

  onBuyNow(policyId: number): void {
    if (localStorage.getItem('authToken') != null) {
      if (this.userRole) {
        this.router.navigate(['personalDetail'], { queryParams: { policyId: policyId } });
      } else {
        console.error('UserRole is undefined');
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
