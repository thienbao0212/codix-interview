
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { RegisterComponent } from './module/register/register.component';
import { LoginComponent } from './module/login/login.component';
import { AccountGuard } from './account.guard';

const routes: Routes = [{
  path:'',
  component:AccountComponent,
  children:[{
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },{
    path:'register',
    component: RegisterComponent
  },{
    path: 'login',
    component: LoginComponent,
    canActivate:[AccountGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
