import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent
    //canActivate: [AuthGuard]
  },
  {
    path: "dashboard/:id",
    component: DashboardComponent
    //canActivate: [AuthGuard]
  },

  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
