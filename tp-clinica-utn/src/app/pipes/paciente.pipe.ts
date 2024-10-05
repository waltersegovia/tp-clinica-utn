import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from '../interfaces/Paciente';

@Pipe({
  name: 'paciente'
})
export class PacientePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: Paciente): string {
    return 'Pac. ' + value.nombre + ', ' + value.apellido;
  }


}
