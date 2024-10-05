import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfesionalComponent } from './profesional.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';
import { TurnosSolicitarComponent } from 'src/app/components/turnos-solicitar/turnos-solicitar.component';
import { SeccionPacienteComponent } from 'src/app/components/seccion-paciente/seccion-paciente.component';
import { PacientesProfesionalComponent } from '../pacientes-profesional/pacientes-profesional.component';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalComponent, children: [
      { path: '', component: MiPerfilComponent },
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      //{ path: 'solicitar-turno', component: TurnosSolicitarComponent },
      //{ path: 'paciente', component: SeccionPacienteComponent },
      { path: 'pacientes-profesional', component: PacientesProfesionalComponent },
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalRoutingModule {}
