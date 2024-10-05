import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
 
@Injectable({
  providedIn: 'root'
})

export class RecaptchaService {
  private apiUrl = 'https://www.google.com/recaptcha/api/siteverify?secret='; //URL_DE_TU_SERVICIO_DE_VALIDACION https://www.google.com/recaptcha/api/siteverify?secret=
  constructor(private http: HttpClient) {}

  // validarCaptcha(token: string): Observable<any> {
  //   const data = { token };
  //   return this.http.post<any>(this.apiUrl, data);
  // }
  


  recaptchaSecretKey = '6LdXHw4qAAAAAF8u-VDHE-hr8H2EUmrKPKw0RFTM';

  validarCaptcha(token: string): Observable<any> {
    const data = { secret: this.recaptchaSecretKey, response: token }; // Replace 'recaptchaSecretKey' with your actual secret key
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post<any>(this.apiUrl, data, httpOptions);
  }


  getTokenClientModule(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    console.log("Token:"+token);
      return this.http.post<any>( 'https://www.google.com/recaptcha/api/siteverify?secret=' + token +'/', httpOptions).pipe(
          map((response) => response),
          catchError((err) => {
            console.log('error caught in service')
            console.error(err);
            return throwError(err);
          })
        );
  }
}
// http://0.0.0.0:5000/api/v1/verificar/
// ******************************************************************************************************

// import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
// import {isPlatformBrowser} from '@angular/common';
// import { Observable, throwError} from 'rxjs';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {catchError, map} from "rxjs/operators";
 
// @Injectable({
//   providedIn: 'root'
// })
// export class RecaptchaService {
//   constructor(private http: HttpClient) {
//   }
  /*
  Modo de comunicación con el servidor asíncrono
  parametro token: string
  return Observable<any>
   */
//   getTokenClientModule(token: string): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//       })
//     };
//       return this.http.post<any>( 'http://0.0.0.0:5000/api/v1/verificar/' + token +'/', httpOptions)
//         .pipe(
//           map((response) => response),
//           catchError((err) => {
//             console.log('error caught in service')
//             console.error(err);
//             return throwError(err);
//           })
//         );
//   }
// }

//***************************************************************************************************************/

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecaptchaService {

//   private siteKey: string;
//   private secretKey: string;

//   constructor(private http: HttpClient) { }

//   setSiteKey(siteKey: string) {
//     this.siteKey = siteKey;
//   }

//   setSecretKey(secretKey: string) {
//     this.secretKey = secretKey;
//   }

//   execute(token: string): Promise<any> {
//     const url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + this.secretKey + '&response=' + token;
//     return this.http.get(url)
//       .toPromise()
//       .then(response => response.json());
//   }

// }

/******************************************************************************************************************* */

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecaptchaService {

//   private siteKey: string;

//   constructor(private http: HttpClient) { }

//   setSiteKey(siteKey: string) {
//     this.siteKey = siteKey;
//   }

//   execute(action: string): Promise<any> {
//     const url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + this.siteKey + '&action=' + action;
//     return this.http.get(url)
//       .toPromise()
//       .then(response => response.json());
//   }

// }
