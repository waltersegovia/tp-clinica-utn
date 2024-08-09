// import { Component, inject, OnInit } from '@angular/core';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
// import { RecaptchaService } from 'src/app/services/recaptcha.service';

// @Component({
//   selector: 'app-chaptcha',
//   templateUrl: './chaptcha.component.html',
//   styleUrls: ['./chaptcha.component.scss']
// })

// export class ChaptchaComponent {
//   public robot: boolean;
//   public presionado: boolean;
//   recaptchaV3Service = inject(ReCaptchaV3Service);

// //  ,  private recaptchaV3Service: ReCaptchaV3Service
//   constructor( private httpService: RecaptchaService) {
//     this.robot = true;
//     this.presionado = false;
//   }
 
//   ngOnInit(): void {
//     this.robot = true;
//     this.presionado = false;
//   }
 
//   getInfoRecaptcha() {
//     this.robot = true;
//     this.presionado = true;
//     this.recaptchaV3Service.execute('')
//       .subscribe((token) => {
//           const auxiliar = this.httpService.getTokenClientModule(token)
//           auxiliar.subscribe( {
//             complete: () => {
//               this.presionado = false;
//             },
//             error: () => {
//               this.presionado = false;
//               this.robot = true;
//               alert('Tenemos un problema, recarga la página página para solucionarlo o contacta con walter@gmail.com');
//             },
//             next: (resultado: Boolean) => {
//               if (resultado === true) {
//                 this.presionado = false;
//                 this.robot = false;
//               } else {
//                 alert('Captcha error, eres un robot')
//                 this.presionado = false;
//                 this.robot = true;
//               }
//             }
//           });
//         }
//       );
//   }
// }

// //********************************************************************************** */
// // export class ChaptchaComponent implements OnInit {

// //   private recaptchaService: RecaptchaService;

// //   constructor(recaptchaService: RecaptchaService) {
// //     this.recaptchaService = recaptchaService;
// //   }

// //   ngOnInit() {
// //     this.recaptchaService.setSiteKey('YOUR_SITE_KEY'); // Replace with your real site key
// //   }

// //   submitForm() {
// //     this.recaptchaService.execute('submit')
// //       .then(response => {
// //         if (response.success) {
// //           console.log('reCAPTCHA challenge successful:', response.score);
// //           // Submit form data to server
// //         } else {
// //           console.log('reCAPTCHA error:', response.error_code);
// //           // Handle reCAPTCHA error case (optional)
// //         }
// //       });
// //   }

// // }