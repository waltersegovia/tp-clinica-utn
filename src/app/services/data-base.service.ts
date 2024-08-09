import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor() { 
    
  }


}


/******************************************************************************************/
// export class DataBaseService {

//   // constructor() { }

//   private surveys: Survey[] = []; // Array para almacenar las encuestas

//   constructor(private firebase: DataBaseService) { } // Inyectar servicio de base de datos

//   getSurveys(): Observable<Survey[]> {
//     return this.firebase.getObservable<Survey>(enumCollectionNames.Surveys) // Obtener datos de encuestas
//       .pipe(
//         map((data) => data.map((surveyData) => new Survey(surveyData))) // Mapear datos a instancias de Survey
//       );
//   }

//   createCharts() {
//     // Implementar la lógica para crear gráficos con base en las encuestas
//   }
// }