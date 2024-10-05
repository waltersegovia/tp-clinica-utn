import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { AngularFireAuth } from '@angular/fire/compat/auth';

const ABSTRACT_API_URL = 'https://emailvalidation.abstractapi.com/v1/';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService{

  constructor(private http: HttpClient) {}

  


// ngOnInit() {

//  verificacion(){
//     this.afAuth.authState.subscribe(user => {
//       if (user) {
//         console.log('User is logged in:', user);
//         console.log('Email verified:', user.emailVerified);
//         return true;
//       } else {
//         console.log('User is not logged in');
//         return false;
//       }
//     });
//   }

  
//}//user?

verifyEmail(emailAddress: string, apiKey: string): Observable<any> {
  const url = `${ABSTRACT_API_URL}?api_key=${apiKey}&email=${emailAddress}`;
  return this.http.get(url);
}

}
