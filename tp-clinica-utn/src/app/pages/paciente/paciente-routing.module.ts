import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';
import { TurnosSolicitarComponent } from 'src/app/components/turnos-solicitar/turnos-solicitar.component';


const routes: Routes = [
  {
    path: '',
    component: PacienteComponent, children: [
      { path: '', component: MiPerfilComponent },
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      { path: 'solicitar-turno', component: TurnosSolicitarComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
