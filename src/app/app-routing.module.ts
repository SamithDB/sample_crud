import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent} from './products/products.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  //Routes -----
  // { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: '', component : LoginComponent},
  { path: 'signup', component : SignupComponent},
  { path: 'products', component : ProductsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
