import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomenComponent } from './welcomen/welcomen.component';
import { RegisterComponent } from './register/register.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'bienvenido', pathMatch: 'full'
  },
  {
    path: 'bienvenido',
    component: WelcomenComponent,
    data: {animation: 'Bienvenido'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {animation: 'Login'}
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'verificarCorreo',
    component: VerificarCorreoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
