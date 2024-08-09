import { Component } from '@angular/core';
import { Item } from 'src/app/components/layout/layout.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent {


  items: Item[] = [];
  constructor() {
    this.items = [
      {
        title: 'Mi Perfil',
        link: 'mi-perfil',
        active: false,
      },
      {
        title: 'Mis Turnos',
        link: 'mis-turnos',
        active: false,
      },
      {
        title: 'Solicitar Turnos',
        link: 'solicitar-turno',
        active: false,
      },
    ];
  }
}
