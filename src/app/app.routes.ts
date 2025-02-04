import { authRoutes } from './pages/auth/auth.routes';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BankNewsComponent } from './pages/bank-news/bank-news.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'ebanky-news',
    component: BankNewsComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  },
  // {
  //   path: 'ebanky-news',
  //   component: BankNewsComponent,
  //   canActivate: [authGuard]
  // },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
