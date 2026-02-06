import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {Employees} from './pages/employees/employees';

export const routes: Routes = [
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'employees',component:Employees,canActivate:[authGuard]},
  {path:'',redirectTo:'login',pathMatch:'full'},
];
