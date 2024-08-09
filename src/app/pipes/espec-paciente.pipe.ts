import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especPaciente'
})
export class EspecPacientePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(pacientes: any[], especialista: any): any[] {
    if (!especialista) {
      return pacientes; // Return all patients if no filter provided
    }
    return pacientes.filter(paciente => paciente.especialista === especialista); // Filter by specialist
  }

}
