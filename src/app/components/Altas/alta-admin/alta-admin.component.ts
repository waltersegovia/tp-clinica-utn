import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ObraSocial } from 'src/app/interfaces/ObraSocial';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit{
  admin: FormGroup;
  file: any;
  loading: boolean = false;

  recaptcha: boolean = false;
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  isCaptchaDisabled: boolean = false;
  isCheck: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.admin = this.fb.group({
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
      rol:['Administrador']
    });
  }

  ngOnInit(): void {}
  
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

  addAdministrador() {
    this.loading = true;
    this.auth.registerUser(this.admin.value.mail, this.admin.value.password)
      .then(async({user}) => {

        if(user.emailVerified == false){
          await this.auth.VerificacionEmail();
        }

        if(this.file) {
          const Url = await this.uploadFile(this.file);
          this.admin.patchValue({ imagen: Url });
        }
        
        if(user){
          const id = user.uid;
          this.admin.patchValue({ password: '' });
          const admin = this.admin.value;
          await this.clinicaFire.addAdministrador(admin,id);
          this.toastr.success('El Administrador se registro correctamente, Verifique su correo Electronico', 'Success');
          this.admin.reset()
        }

        this.loading = false;
      }).catch((error)=>{
        this.loading = false;
        console.log("error al registrar"+ error)
      });
  }

  async uploadFile(file: any) {
    const imgRef = ref(this.storage, `images/${this.file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  }


  // <hr class="my-4" />
  //  <button class="w-100 btn btn-lg" style="background-color: #0d689d; color: white" type="submit"
  //  [disabled]="!profesional.valid || (isCaptchaDisabled ? false : !isCheck)">
  //  Agregar
  //</button>

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
  }

  captchaOnOff(){
    if (this.isCaptchaDisabled) {
      this.isCaptchaDisabled=false;
    }else{
      this.isCaptchaDisabled=true;
    }
    
  }

}
