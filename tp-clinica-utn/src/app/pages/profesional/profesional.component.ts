import { Component } from '@angular/core';
import { Item } from 'src/app/components/layout/layout.component';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent {

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
        title: 'Pacientes',
        link: 'pacientes-profesional',
        active: false,
      },
      // {
      //   title: 'Solicitar Turnos',
      //   link: 'solicitar-turno',
      //   active: false,
      // },
    ];
  }
}
