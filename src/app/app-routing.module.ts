import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path:'home',
    component : HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
