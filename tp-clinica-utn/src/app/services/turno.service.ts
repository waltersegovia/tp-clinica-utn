import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Turno } from '../interfaces/Turno';
import { Paciente } from '../interfaces/Paciente';
import { distinct } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  turnos = collection(this.fire, 'turnos');

  constructor(private fire: Firestore) {}

  add(objeto: Turno) {
    return addDoc(this.turnos, objeto);
  }
  
  actualizar(id: string, objeto: any) {
    const docRef = doc(this.fire, 'turnos', id);
    return updateDoc(docRef, objeto);
  }

  getTurnos(): Observable<Turno[]> {
    return collectionData(this.turnos, { idField: 'id' }) as Observable<Turno[]>;
  }

  getTurnoPorid(tipoID: string, uid: string): Observable<Turno[]> {
    const q = query(
      this.turnos,
      where(tipoID, '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Turno[]>;
  }

  getPacientesProfesional(id: string): Observable<Paciente[]> {
    return collectionData(this.turnos, { idField: 'id' })
      .pipe(
        map((turnos: Turno[]) => turnos.filter(turno => turno.idEsp === id && turno.estado === 'finalizado' )),
        // Mapear cada turno a un Paciente
        map((turnos: Turno[]) => 
          turnos.map((turno) => ({
            id: turno.idPac,
            ...turno.paciente
          }) as Paciente)
        )
      );
  }

}




// import { Injectable } from '@angular/core';
// import {
//   Firestore,
//   addDoc,
//   collection,
//   collectionData,
//   doc,
//   onSnapshot,
//   updateDoc,
//   where,
//   query
// } from '@angular/fire/firestore';
// import { map, Observable } from 'rxjs';
// import { Turno } from '../interfaces/Turno';
// import { Paciente } from '../interfaces/Paciente';
// import { distinct } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root',
// })
// export class TurnoService {
//   turnos = collection(this.fire, 'turnos');

//   constructor(private fire: Firestore) {}

//   add(objeto: Turno) {
//     return addDoc(this.turnos, objeto);
//   }
  
//   actualizar(id: string, objeto: any) {
//     const docRef = doc(this.fire, 'turnos', id);
//     return updateDoc(docRef, objeto);
//   }

//   getTurnos(): Observable<Turno[]> {
//     return collectionData(this.turnos, { idField: 'id' }) as Observable<Turno[]>;
//   }

//   getTurnoPorid(tipoID: string, uid: string): Observable<Turno[]> {
//     const q = query(
//       this.turnos,
//       where(tipoID, '==', uid));
//     return collectionData(q, { idField: 'id' }) as Observable<Turno[]>;
//   }
//   getPacientesProfesional(id: string): Observable<Paciente[]> {
//     return collectionData(this.turnos, { idField: 'id' })
//       .pipe(
//         map((turnos: Turno[]) => turnos.filter(turno => turno.idEsp === id)),
//         // Mapear cada turno a un Paciente
//         map((turnos: Turno[]) => 
//           turnos.map((turno) => ({
//             id: turno.idPac, // Priorizar idPac
//             ...turno.paciente // Luego completar con demás propiedades
//           }) as Paciente)
//         )
       
//       );
//   }

// }
