import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { TablaEspecialidadComponent } from './tabla-especialidad/tabla-especialidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProfPendientesComponent } from './list-prof-pendientes/list-prof-pendientes.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { AltaPacientesComponent } from './Altas/alta-pacientes/alta-pacientes.component';
import { AltaProfesionalesComponent } from './Altas/alta-profesionales/alta-profesionales.component';
import { AltaAdminComponent } from './Altas/alta-admin/alta-admin.component';
import { FavbuttonComponent } from './favbutton/favbutton.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { DoctorPipe } from '../pipes/doctor.pipe';

import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TurnosSolicitarComponent } from './turnos-solicitar/turnos-solicitar.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
//import { ChaptchaComponent } from './chaptcha/chaptcha.component';
import { ModalTurnoComponent } from './modal-turno/modal-turno.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SeccionPacienteComponent } from './seccion-paciente/seccion-paciente.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FormatKeyValuePipe } from '../pipes/format-key-value.pipe';
import { AltaDiaHorarioComponent } from './Altas/alta-dia-horario/alta-dia-horario.component';
import { OnlyNumberDirective } from '../directivas/only-number.directive';
import { TurnoRowComponent } from './turno-row/turno-row.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SpinnerComponent,
    TablaEspecialidadComponent,
    ListProfPendientesComponent,
    ModalUsuarioComponent,
    AltaPacientesComponent,
    AltaProfesionalesComponent,
    AltaAdminComponent,
    FavbuttonComponent,
    MiPerfilComponent,
    DoctorPipe,
    MisTurnosComponent,
    TurnosSolicitarComponent,
    MisHorariosComponent,
    //ChaptchaComponent,
    ModalTurnoComponent,
    SeccionPacienteComponent,
    CaptchaComponent,
    FormatKeyValuePipe,
    AltaDiaHorarioComponent,
    OnlyNumberDirective,
    TurnoRowComponent

  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule,NgxCaptchaModule],
  exports: [
    LayoutComponent,
    SpinnerComponent,
    TablaEspecialidadComponent,
    ListProfPendientesComponent,
    AltaPacientesComponent,
    AltaProfesionalesComponent,
    AltaAdminComponent,
    FavbuttonComponent,
    MiPerfilComponent,
    ModalTurnoComponent,
    MisTurnosComponent,
    TurnosSolicitarComponent,
    SeccionPacienteComponent,
    CaptchaComponent,
    DoctorPipe,
    OnlyNumberDirective
  ],
})
export class ComponentsModule {}



//*************************************************************************************************** */
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LayoutComponent } from './layout/layout.component';
// import { RouterModule } from '@angular/router';
// import { SpinnerComponent } from './spinner/spinner.component';
// import { TablaEspecialidadComponent } from './tabla-especialidad/tabla-especialidad.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ListProfPendientesComponent } from './list-prof-pendientes/list-prof-pendientes.component';
// import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
// import { AltaPacientesComponent } from './Altas/alta-pacientes/alta-pacientes.component';
// import { AltaProfesionalesComponent } from './Altas/alta-profesionales/alta-profesionales.component';
// import { AltaAdminComponent } from './Altas/alta-admin/alta-admin.component';
// import { FavbuttonComponent } from './favbutton/favbutton.component';
// import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
// import { DoctorPipe } from '../pipes/doctor.pipe';

// import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
// import { TurnosSolicitarComponent } from './turnos-solicitar/turnos-solicitar.component';
// import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
// import { ChaptchaComponent } from './chaptcha/chaptcha.component';
// import { ModalTurnoComponent } from './modal-turno/modal-turno.component';
// import { NgxCaptchaModule } from 'ngx-captcha';
// import { SeccionPacienteComponent } from './seccion-paciente/seccion-paciente.component';

// @NgModule({
//   declarations: [
//     LayoutComponent,
//     SpinnerComponent,
//     TablaEspecialidadComponent,
//     ListProfPendientesComponent,
//     ModalUsuarioComponent,
//     AltaPacientesComponent,
//     AltaProfesionalesComponent,
//     AltaAdminComponent,
//     FavbuttonComponent,
//     MiPerfilComponent,
//     DoctorPipe,
//     MisTurnosComponent,
//     TurnosSolicitarComponent,
//     MisHorariosComponent,
//     ChaptchaComponent,
//     ModalTurnoComponent,
//     SeccionPacienteComponent,

//   ],
//   imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule,NgxCaptchaModule],
//   exports: [
//     LayoutComponent,
//     SpinnerComponent,
//     TablaEspecialidadComponent,
//     ListProfPendientesComponent,
//     AltaPacientesComponent,
//     AltaProfesionalesComponent,
//     AltaAdminComponent,
//     FavbuttonComponent,
//     MiPerfilComponent,
//     ModalTurnoComponent,
//     MisTurnosComponent,
//     TurnosSolicitarComponent,
//     SeccionPacienteComponent
//   ],
// })
// export class ComponentsModule {}
