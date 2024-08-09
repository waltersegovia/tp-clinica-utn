import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionUserComponent } from './section-user/section-user.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';
import { AdminComponent } from './admin.component';
import { TurnosSolicitarComponent } from 'src/app/components/turnos-solicitar/turnos-solicitar.component';
import { SeccionPacienteComponent } from 'src/app/components/seccion-paciente/seccion-paciente.component';
import { FormUserComponent } from './form-user/form-user.component';
import { EstadisticaComponent } from 'src/app/graficos/estadistica/estadistica.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: SectionUserComponent },
      { path: 'inicio', component: SectionUserComponent },
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      { path: 'solicitar-turno/:id', component: TurnosSolicitarComponent },
      { path: 'seccion-paciente', component: SeccionPacienteComponent },
      { path: 'estadistica', component: EstadisticaComponent },
      //{ path: 'form-user', component: FormUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
