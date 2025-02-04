import { authRoutes } from './pages/auth/auth.routes';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BankNewsComponent } from './pages/bank-news/bank-news.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
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
  }
];
