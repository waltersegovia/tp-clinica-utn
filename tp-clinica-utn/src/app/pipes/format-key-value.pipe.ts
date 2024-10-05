import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatKeyValue'
})
export class FormatKeyValuePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  // transform(value: any, key: string): string {
  //   if (!value || !key) {
  //     return '';
  //   }

  //   return `<strong>${key}:</strong> ${value} - `;
  // }

  // transform(value: any): any {
  //   // Lógica para transformar el valor
  //   if (value) {
  //     return value.toUpperCase(); // Ejemplo: Convertir a mayúsculas
  //   } else {
  //     return 'N/A'; // Valor por defecto si es nulo o indefinido
  //   }
  // }

  transform(value: any): any {
    // Lógica para transformar el valor
    if (!Array.isArray(value)) {
      return value.toUpperCase(); // Ejemplo: Convertir a mayúsculas
    } else {
      return 'N/A'; // Valor por defecto si es nulo o indefinido
    }
  }
}
