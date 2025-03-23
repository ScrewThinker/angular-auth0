import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@auth0/auth0-angular';
import { DashboardComponent } from './auth/components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MembersComponent,
    ClassesComponent,
    TrainersComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-ap3njygmes8twpv3.us.auth0.com',
      clientId: 'OkpWRlHcfHKpJfqY38xz5BMX2jl9UEHC',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-ap3njygmes8twpv3.us.auth0.com/api/v2/',
        scope: 'openid profile email'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }