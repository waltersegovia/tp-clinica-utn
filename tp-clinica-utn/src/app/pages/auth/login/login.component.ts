import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('enterState',[
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(500,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;
  public user: string = "";

  constructor(
    private fb: FormBuilder,
    private authUser: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService,
    private clinicaFire: ClinicaService,
    private firestore: Firestore
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    console.log(email)
    console.log(password)
    this.loading = true;
    
    let col = collection(this.firestore,"logins");
    addDoc(col, {fecha: new Date(), "email": email})

    this.authUser
      .loginUser(email, password)
      .then(async (data) => {
      
          // const docSnap = await this.clinicaFire.getUserByID(data.user.uid);
          // const user = docSnap.data();
          // if (!user) {
          //   return;
          // }
          // this.redirectoPage(user);
          // this.loading = false;
      
        
        if(data.user.emailVerified){
          const docSnap = await this.clinicaFire.getUserByID(data.user.uid);
          const user = docSnap.data();

         

          if (!user) {
            return;
          }
          this.redirectoPage(user);
          this.loading = false;
      
        }else{
          this.toastr.warning("Su dirección de correo electrónico no ha sido verificada.", 'Correo Electrónico No Verificado');
          this.loading = false;
        }

      })
      .catch((error: any) => {
        this.loading = false;
        if (error.message) {
          this.toastr.error(error.message, 'Error');
        } else {
          this.toastr.error(this.fireError.codeError(error.code), 'Error');
        }
      });
  }
  quickAccess(email: string, password: string) {
    this.loginUsuario.setValue({
      email,
      password
    });
  }

  redirectoPage(user: any) {
    const profile = user['rol'];
    switch (profile) {
      case 'Administrador':
        this.router.navigate(['/admin']);
        break;
      case 'Paciente':
        this.router.navigate(['/paciente']);
        break;
      case 'Profesional':
        let estado = user['estado'];
        if(estado == "Pendiente"){
          this.toastr.warning('Su cuenta esta pendiente de aprobación', 'Cuenta pendiente');
        }else if(estado == "Rechazado"){
          this.toastr.error('Su encuenta no fue aprobada, comuniquese con la administracion', 'Cuenta Rechazada');
        }else{
          this.router.navigate(['/profesional']);
        }
        break;
    }
  }

  goBack(){
    this.router.navigate(['/auth']);
  }
}



