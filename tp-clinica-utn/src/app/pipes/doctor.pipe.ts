import { Pipe, PipeTransform } from '@angular/core';
import { Profesional } from '../interfaces/Profesional';

@Pipe({
  name: 'doctor'
})
export class DoctorPipe implements PipeTransform {

  transform(value: Profesional): string {
    return 'Dr/a. ' + value.apellido + ', ' + value.nombre;
  }

}
