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
import { ReCaptcha2Component } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import Especialidad from 'src/app/interfaces/Especialidad';
import { Profesional } from 'src/app/interfaces/Profesional';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-alta-profesionales',
  templateUrl: './alta-profesionales.component.html',
  styleUrls: ['./alta-profesionales.component.scss']
})

export class AltaProfesionalesComponent {
  profesional: FormGroup;
  file: any;
  loading: boolean = false;
  especialidades: string[] = [];
  siteKey: string;
  recaptcha: boolean = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  recaptcha2: boolean = false;
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  isCaptchaDisabled: boolean = false;
  isCheck: boolean = false;
  btnDisabled: boolean = false;


  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage,
    private auth: AuthService,
    private toastr: ToastrService,
  ) {
    this.profesional = this.fb.group({
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
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagen: [''],
      especialidades: this.fb.array([]),
      estado: ['Pendiente'],
      rol:['Profesional']
    });
    this.siteKey = '6Lck3yApAAAAAD67G7-iTRntXQfLlcXcUHWiYdhh';

  }


  ngOnInit(): void {
   
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
  
  addprofesional() {
    this.loading = true;
    const email = this.profesional.value.mail;
    const password = this.profesional.value.password;
    this.auth.registerUser(email, password).then(async({user}) => {

      if(user.emailVerified == false){
        await this.auth.VerificacionEmail();
      }

      if(this.file) {
        const Url = await this.uploadFile(this.file);
        this.profesional.patchValue({ imagen: Url });
      }
      
      if(user){
        const id = user.uid;
        this.profesional.patchValue({ password: '' });
        const profesional = this.profesional.value as Profesional;
        profesional.especialidades = this.especialidades;
        await this.clinicaFire.addProfesional(profesional, id);
        this.toastr.success('El Profesional se registro correctamente, Verifique su correo Electronico', 'Success');
        this.profesional.reset();
      }
      this.loading = false;
    }).catch((error)=>{
      this.loading = false;
      console.log("error al registrar"+error)
    });
  }
  async uploadFile(file: any) {
    const imgRef = ref(this.storage, `images/${this.file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  }

  seleccionarEspecialidad(especialidad: Especialidad) {
    const existe = this.especialidades.find((a) => a === especialidad.nombre);
    if (!existe) {
      this.especialidades.push(especialidad.nombre);
    }

  }
  eliminarElemento(name: string ) {
    this.especialidades = this.especialidades.filter(especialidad => especialidad !== name);
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
