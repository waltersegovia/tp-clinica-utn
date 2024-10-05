import { Component } from '@angular/core';
import { Item } from './components/layout/layout.component';
import { slideInAnimation } from './route-animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ] 
})
export class AppComponent {
  items: Item[] = [
    {
      title: 'Inicio',
      link: '/',
      active: true,
    },
    {
      title: 'Admin',
      link: '/admin',
      active: true
    }
  ]

  itemAuth: Item[] = [
    {
      title: 'Acceso',
      link: '/auth/login',
      active: false, 
    },
    {
      title: 'Empezar',
      link: '/',
      active: false, 
      children: [
        {
          title: 'Profesionales',
          link: '/auth/altaProfesional',
          active: true,
        },
        {
          title: 'Paciente',
          link: '/auth/altaPaciente',
          active: false,
        },
      ],
    }
  ]
}
