import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGraficoComponent } from './graficos/log-grafico/log-grafico.component';
// import { TurnoDiaGrafComponent } from './graficos/turno-dia-graf/turno-dia-graf.component';
// import { TurnoEspGrafComponent } from './graficos/turno-esp-graf/turno-esp-graf.component';
// import { TurnoMedicoGrafComponent } from './graficos/turno-medico-graf/turno-medico-graf.component';
// import { TurnosFinGrafComponent } from './graficos/turnos-fin-graf/turnos-fin-graf.component';
import { VerificarCorreoComponent } from './pages/auth/verificar-correo/verificar-correo.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormUserComponent } from './pages/admin/form-user/form-user.component';
import { LogsComponent } from './graficos/logs/logs.component';
import { AltaDiaHorarioComponent } from './components/Altas/alta-dia-horario/alta-dia-horario.component';
import { SeccionPacienteComponent } from './components/seccion-paciente/seccion-paciente.component';
import { PacientesProfesionalComponent } from './pages/pacientes-profesional/pacientes-profesional.component';
import { EstadisticaComponent } from './graficos/estadistica/estadistica.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
      data: {animation: 'Admin'}
  },
  {
    path: 'profesional',
    loadChildren: () =>
      import('./pages/profesional/profesional.module').then((m) => m.ProfesionalModule),
  },
  {
    path: 'paciente',
    // canActivate: [VerifiedGuard, PacienteGuard],
    loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'logo-grafico',
    component: LogGraficoComponent,
  },
  {
    path: 'verificar-correo',
    component: VerificarCorreoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'form-user',
    component: FormUserComponent,
  },
  {
    path: 'log',
    component: LogsComponent,
  },
  {
    path: 'alta-dia-horario',
    component: AltaDiaHorarioComponent,
  },
  {
    path: 'pacientes-profesional',
    component: PacientesProfesionalComponent,
  },
  // { 
  //   path: 'seccion-paciente', 
  //   component: SeccionPacienteComponent 
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
