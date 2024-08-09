import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  sendEmailVerification
} from '@angular/fire/auth';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  
  loginUser(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  registerUser(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  VerificacionEmail(){
    return sendEmailVerification(this.auth.currentUser);
  }
  
  getUserLogged(){
    return this.auth.currentUser;
  }
  getUserEmail(): string | null {
    const user = this.auth.currentUser;
    return user ? user.email : null;
  }
  getAuthState() {
    return authState(this.auth);
  }

  getUserID() {
    return authState(this.auth).pipe(
      take(1),
      map(
        usuario => {
          if (usuario) {
            return usuario.uid
          }
          throw Error('No hay usuario.');
        }
      )
    );
  }
}



//********************************************************************* */
// import { Injectable } from '@angular/core';
// import {
//   Auth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   authState
// } from '@angular/fire/auth';
// import { map, take } from 'rxjs';

// //import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private auth: Auth) { }
  
//   loginUser(email: string, password: string): Promise<any> {
//     return signInWithEmailAndPassword(this.auth, email, password);
//   }
//   logout() {
//     return this.auth.signOut();
//   }
//   registerUser(email: string, password: string): Promise<any> {
//     return createUserWithEmailAndPassword(this.auth, email, password);
//   }
//   getUserLogged(){
//     return this.auth.currentUser;
//   }
//   getUserEmail(): string | null {
//     const user = this.auth.currentUser;
//     return user ? user.email : null;
//   }
//   getAuthState() {
//     return authState(this.auth);
//   }

//   getUserID() {
//     return authState(this.auth).pipe(
//       take(1),
//       map(
//         usuario => {
//           if (usuario) {
//             return usuario.uid
//           }
//           throw Error('No hay usuario.');
//         }
//       )
//     );
//   }
// }
