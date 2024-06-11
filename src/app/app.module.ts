import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PolicyComponent } from './components/policy/policy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PremiumPaymentComponent } from './components/premium-payment/premium-payment.component';
import { PolicyCreationComponent } from './components/policy-creation/policy-creation.component';
import { MypolicyComponent } from './components/mypolicy/mypolicy.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SideNavComponent,
    PolicyComponent,
    DashboardComponent,
    PersonalDetailsFormComponent,
    PremiumPaymentComponent,
    PolicyCreationComponent,
    MypolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule ,
    HttpClientModule,
    MatMenuModule ,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule ,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
