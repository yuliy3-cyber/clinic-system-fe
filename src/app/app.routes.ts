import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { NewAppointmentComponent } from './pages/new-appointment/new-appointment.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { EditAppointmentComponent } from './pages/edit-appointment/edit-appointment.component';
import { HomeComponent } from './pages/home/home.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';
import { AddPrescriptionComponent } from './pages/add-prescription/add-prescription.component';
import { PrescriptionListComponent } from './pages/prescription-list/prescription-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'appointment-list',
        component: AppointmentListComponent,
        canActivate: [AuthGuard],
        // data: { expectedRole: 'Admin' },
      },
      {
        path: 'new-appointment',
        component: NewAppointmentComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'edit-appointment/:id',
        component: EditAppointmentComponent,
        canActivate: [AuthGuard],
        // data: { expectedRole: 'Admin' },
      },
      {
        path: 'patient-list',
        component: PatientListComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'new-user',
        component: NewUserComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'book-appointment',
        component: BookAppointmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'appointment-details/:id',
        component: AppointmentDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'prescription-list',
        component: PrescriptionListComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
      {
        path: 'add-prescription',
        component: AddPrescriptionComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
      },
    ],
  },
];
