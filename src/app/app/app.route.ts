import { Routes } from '@angular/router';
import { AuthService } from '@framework/Service/auth.service';
import { Login } from '@app/login/login';


export const appRouter: Routes = [
  {
    path: 'index',
    canLoad: [AuthService],
    loadChildren: '../index.module#IndexModule'
  },
  {
    path: 'login', component: Login
  },
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'index', pathMatch: 'full'
  }
];
