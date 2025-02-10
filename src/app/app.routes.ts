import { authRoutes } from './pages/auth/auth.routes';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BankNewsComponent } from './pages/bank-news/bank-news.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { CollecteFormComponent } from './components/collecte-form/collecte-form.component';
import { CollectListComponent } from './components/collect-list/collect-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditIconComponent } from './components/icons/edit-icon/edit-icon.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateCollecteComponent } from './componnents/update-collecte/update-collecte.component';

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
    path: 'collecte-form',
    component: CollecteFormComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'collecte-list',
    component: CollectListComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'collecte/edit/:id',
    component: UpdateCollecteComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
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
