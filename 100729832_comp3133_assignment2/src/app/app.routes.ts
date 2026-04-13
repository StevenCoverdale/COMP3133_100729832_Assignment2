import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { EmployeeAddComponent } from './components/employee-add/employee-add';
import { EmployeeViewComponent } from './components/employee-view/employee-view';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'employees',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'add', component: EmployeeAddComponent },
      { path: ':id', component: EmployeeViewComponent },
      { path: ':id/edit', component: EmployeeEditComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];