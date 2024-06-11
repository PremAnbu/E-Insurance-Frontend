import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PolicyComponent } from './components/policy/policy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';
import { PremiumPaymentComponent } from './components/premium-payment/premium-payment.component';
import { PolicyCreationComponent } from './components/policy-creation/policy-creation.component';
import { MypolicyComponent } from './components/mypolicy/mypolicy.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',redirectTo: 'policy',pathMatch: 'full'
      },
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'myPolicy',
        component: MypolicyComponent
      },
      {
        path: 'createpolicy',
        component: PolicyCreationComponent
      },
      {
        path: 'premium/:role',
        component: PremiumPaymentComponent
      },
      {
        path: 'personalDetail',
        component: PersonalDetailsFormComponent
      }
    ]
  },
  {
    path: 'signup/:role',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
