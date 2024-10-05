import { Component, Input } from '@angular/core';
import { Turno } from 'src/app/interfaces/Turno';

@Component({
  selector: 'app-turno-row',
  templateUrl: './turno-row.component.html',
  styleUrls: ['./turno-row.component.scss']
})

export class TurnoRowComponent {
  @Input() turnos: Turno[];
  @Input() miRol: string = '';
}
