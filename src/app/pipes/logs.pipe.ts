// import { Pipe, PipeTransform } from '@angular/core';
// import { LogsComponent } from '../graficos/logs/logs.component';

// @Pipe({
//   name: 'logs'
// })
// export class LogsPipe implements PipeTransform {

//   // transform(value: unknown, ...args: unknown[]): unknown {
//   //   return null;
//   // }

//   transform(date: Date | string): string {
//     if (!date) {
//       return ''; // Handle invalid date
//     }

//     // Convert date to JavaScript Date object if it's a string
//     if (typeof date === 'string') {
//       date = new Date(date);
//     }

//     // Extract date components
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Months are zero-indexed
//     const year = date.getFullYear();

//     // Format the date string
//     const formattedDate = `<span class="math-inline">\{day\}/</span>{month}/${year}`;

//     return formattedDate;
//   }

// }
