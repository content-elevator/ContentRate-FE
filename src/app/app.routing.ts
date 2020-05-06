import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {AuthGuard} from './shared/service/auth.guard.service';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './user/profile/profile.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
