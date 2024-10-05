import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ObraSocial } from 'src/app/interfaces/ObraSocial';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-pacientes',
  templateUrl: './alta-pacientes.component.html',
  styleUrls: ['./alta-pacientes.component.scss'],
})
export class AltaPacientesComponent implements OnInit {
  paciente: FormGroup;
  file: any;
  file2: any;
  obraSociales: ObraSocial[] = [];
  selectedObraSocial: string | null = null;
  loading: boolean = false;
  siteKey: string;
  btnDisabled: boolean = false;

  recaptcha: boolean = false;
 // @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  isCaptchaDisabled: boolean = false;
  isCheck: boolean = false;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.paciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: [
        '',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(99),
          this.validarNumber,
        ],
      ],
      dni: ['', [Validators.required, this.validarNumber]],
      obraSocial: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagen: [''],
      imagen2: [''],
      rol: ['Paciente'],
    });
    this.siteKey = '6Lck3yApAAAAAD67G7-iTRntXQfLlcXcUHWiYdhh';
  }

  ngOnInit(): void {
    this.clinicaFire.getObraSocial().subscribe((data) => {
      this.obraSociales = data;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const container = event.target as HTMLElement;

    // Verifica si el usuario ha llegado al final del contenedor
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Lógica para cargar más elementos aquí
      // Puedes llamar a un método que cargue más elementos en 'profPendientes'
    }
  }

  validarNumber(control: AbstractControl): object | null {
    const data = control.value;
    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(data)) {
      return { soloNumeros: true };
    }
    return null;
  }
  uploadImage($even: any) {
    this.file = $even.target.files[0];
  }
  uploadImage2($even: any) {
    this.file2 = $even.target.files[0];
  }
   addPaciente() {
      this.loading = true;
      const email = this.paciente.value.mail;
      const password = this.paciente.value.password;
      this.auth.registerUser(email, password).then(async({user})=>{

        if(user.emailVerified == false){
          this.auth.VerificacionEmail();
        }
        
        if (this.file) {
          const Url = await this.uploadFile(this.file);
          this.paciente.patchValue({ imagen: Url });
        }

        if (this.file2) {
          const Url = await this.uploadFile(this.file2);
          this.paciente.patchValue({ imagen2: Url });
        }
       
        if (user) {
          const id = user.uid;
          this.paciente.patchValue({ password: '' });
          const paciente = this.paciente.value;
          await this.clinicaFire.addPaciente(paciente, id);
          this.toastr.success('El Paciente se registro correctamente, Verifique su correo Electronico', 'Success');
          this.paciente.reset();
        }
        
        this.loading = false;
      }).catch((error)=>{
        this.loading = false;
        console.log("error al registrar"+error)
      })
    
  }
  async uploadFile(file: any) {
    const imgRef = ref(this.storage, `images/${this.file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  }
  handleSuccess($even:any):void {
    if($even){
      this.recaptcha = true;
    }
  }

  // <div class="captcha">
  //   <button class="btnCapt mb-2" (click)="captchaOnOff()">On/Off</button>
  //   <app-captcha class="btnCapt2 mb-2" [isDisabled]="isCaptchaDisabled" (captchaChange)="onCaptchaChange($event)"/>
  // </div>

  // recaptcha: boolean = false;
  // @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  // isCaptchaDisabled: boolean = false;
  // isCheck: boolean = false;

  onCaptchaChange(check:boolean){
    this.isCheck = check;
    this.btnDisabled = true;
  }

  captchaOnOff(){
    if (this.isCaptchaDisabled) {
      this.isCaptchaDisabled=false;
      this.isCheck = false;
    }else{
      this.isCaptchaDisabled=true;
      this.isCheck = true;
    }
    
  }
}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import {
//   Storage,
//   getDownloadURL,
//   ref,
//   uploadBytes,
// } from '@angular/fire/storage';
// import {
//   AbstractControl,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { ObraSocial } from 'src/app/interfaces/ObraSocial';
// import { AuthService } from 'src/app/services/auth.service';
// import { ClinicaService } from 'src/app/services/clinica.service';
// import { ReCaptcha2Component } from 'ngx-captcha';

// @Component({
//   selector: 'app-alta-pacientes',
//   templateUrl: './alta-pacientes.component.html',
//   styleUrls: ['./alta-pacientes.component.scss'],
// })
// export class AltaPacientesComponent implements OnInit {
//   paciente: FormGroup;
//   file: any;
//   file2: any;
//   obraSociales: ObraSocial[] = [];
//   selectedObraSocial: string | null = null;
//   loading: boolean = false;
//   siteKey: string;
//   recaptcha: boolean = false;
//   @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;


//   constructor(
//     private fb: FormBuilder,
//     private clinicaFire: ClinicaService,
//     private storage: Storage,
//     private auth: AuthService
//   ) {
//     this.paciente = this.fb.group({
//       nombre: ['', [Validators.required, Validators.minLength(3)]],
//       apellido: ['', [Validators.required, Validators.minLength(3)]],
//       edad: [
//         '',
//         [
//           Validators.required,
//           Validators.min(18),
//           Validators.max(99),
//           this.validarNumber,
//         ],
//       ],
//       dni: ['', [Validators.required, this.validarNumber]],
//       obraSocial: ['', [Validators.required]],
//       mail: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       imagen: [''],
//       imagen2: [''],
//       rol: ['Paciente'],
//     });
//     this.siteKey = '6Lck3yApAAAAAD67G7-iTRntXQfLlcXcUHWiYdhh';
//   }

//   ngOnInit(): void {
//     this.clinicaFire.getObraSocial().subscribe((data) => {
//       this.obraSociales = data;
//     });
//   }
//   validarNumber(control: AbstractControl): object | null {
//     const data = control.value;
//     const soloNumeros = /^\d+$/;
//     if (!soloNumeros.test(data)) {
//       return { soloNumeros: true };
//     }
//     return null;
//   }
//   uploadImage($even: any) {
//     this.file = $even.target.files[0];
//   }
//   uploadImage2($even: any) {
//     this.file2 = $even.target.files[0];
//   }
//    addPaciente() {
   

//       this.loading = true;
//       const email = this.paciente.value.mail;
//       const password = this.paciente.value.password;
//       this.auth.registerUser(email, password).then(async(respuesta)=>{
//         if (this.file) {
//           const Url = await this.uploadFile(this.file);
//           this.paciente.patchValue({ imagen: Url });
//         }
//         if (this.file2) {
//           const Url = await this.uploadFile(this.file2);
//           this.paciente.patchValue({ imagen2: Url });
//         }
       
//         if (respuesta) {
//           console.log('se creo un nuevo registro');
//           const id = respuesta.user.uid;
//           console.log(id);
//           this.paciente.patchValue({ password: '' });
//           const paciente = this.paciente.value;
//           await this.clinicaFire.addPaciente(paciente, id);
//           this.paciente.reset();
//         }

//       }).catch((error)=>{
//         this.loading = false;
//         console.log("error al registrar"+error)//mensaje de error
//       })
    
//   }

//   async uploadFile(file: any) {
//     const imgRef = ref(this.storage, `images/${this.file.name}`);
//     const snapshot = await uploadBytes(imgRef, file);
//     return await getDownloadURL(imgRef);
//   }
  
//   handleSuccess($even:any):void {
//     if($even){
//       this.recaptcha = true;
//     }
//   }
// }