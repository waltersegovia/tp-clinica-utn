import { Pipe, PipeTransform } from '@angular/core';
import Administrador from '../interfaces/Administrador';

@Pipe({
  name: 'administrador'
})
export class AdministradorPipe implements PipeTransform {

  transform(value: Administrador): string {
    return 'Admin. ' + value.nombre + ', ' + value.apellido;
  }

}
