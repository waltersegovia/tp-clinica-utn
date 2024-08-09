import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  reservas = collection(this.fire, 'reservas');
  constructor(private fire: Firestore) {}


  getReserva(id:string){
    const q = query(
      this.reservas,
      where('uid', '==', id)
    );
    return collectionData(q, { idField: 'id' });
  }
  add(uid: string, fecha: Date) {
    const data = {
      uid: uid,
      fecha: fecha,
    };
    return addDoc(this.reservas, data);
  }

  async eliminar(uid: string, fecha: Date) {
    const q = query(
      this.reservas,
      where('uid', '==', uid),
      where('fecha', '==', fecha)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

}
