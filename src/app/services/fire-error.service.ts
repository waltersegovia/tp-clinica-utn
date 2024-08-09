import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireErrorService {

  constructor() { }
  codeError(code: string) {
    console.log(code)
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El usuario ya existe';
      case 'auth/weak-password':
        return 'La contraseña es muy debil';
      case 'auth/invalid-email':
        return 'Correo invalido';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/user-not-found':
        return 'El usuario no existe';
      case 'ST':
        return 'No se pudo generar la reserva, intentelo mas tarde';
      default:
        return 'Error desconocido, intentelo mas tarde';
    }
  }
}
