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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'appointment-list',
        component: AppointmentListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-appointment',
        component: NewAppointmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'patient-list',
        component: PatientListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-user',
        component: NewUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
