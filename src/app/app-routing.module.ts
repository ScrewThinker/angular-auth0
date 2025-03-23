import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DashboardComponent } from './auth/components/dashboard/dashboard.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { MembersComponent } from './components/members/members.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { PaymentsComponent } from './components/payments/payments.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard] },
  { path: 'trainers', component: TrainersComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }