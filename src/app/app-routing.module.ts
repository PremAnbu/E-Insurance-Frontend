import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PolicyComponent } from './components/policy/policy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';
import { PremiumPaymentComponent } from './components/premium-payment/premium-payment.component';
import { PolicyCreationComponent } from './components/policy-creation/policy-creation.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"dashboard/:role",
    component:DashboardComponent,
    children:[
      {
        path:"policy",
        component:PolicyComponent
      },
      {
        path:"createpolicy",
        component:PolicyCreationComponent
      },
      {
        path:"premium",
        component:PremiumPaymentComponent
      },
      {
        path:"personalDetail",
        component:PersonalDetailsFormComponent,
        children:[
          
        ]
      }
    ]
  },
  {
    path:"signup/:role",
    component:SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
