import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Turno } from 'src/app/interfaces/Turno';
import HistorialClinica from 'src/app/interfaces/historialClinica';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.scss']
})
export class ModalTurnoComponent implements OnInit {
  mensaje: string = '';
  @Input() data?: Turno | null;
  @Input() estado?: string;
  @Output() closeModal = new EventEmitter();
  historial: FormGroup;
  loading: boolean = false;
  selectedValue: string = "";
 
  constructor(
    private turnoServices: TurnoService,
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private fireError: FireErrorService
  ){
    this.historial = this.fb.group({
      altura: ['', [Validators.required, this.validarNumber]],
      peso: ['', [Validators.required, this.validarNumber]],
      temperatura: ['', [Validators.required, this.validarNumber]],
      presion: ['', [Validators.required, this.validarNumber]],
      datosDinamicos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if(this.estado === 'historial' && this.data && this.data.historial){
      this.historial.patchValue(this.data.historial);
      const datosDinamicosControl = this.historial.get('datosDinamicos') as FormArray;
      datosDinamicosControl.clear();
      this.data.historial.datosDinamicos.forEach(datoDinamico => {
        const datoDinamicoGroup = this.fb.group(datoDinamico);
        datosDinamicosControl.push(datoDinamicoGroup);
      });

    }
  }
  getDatosDinamicos(): FormArray { 
    return this.historial.get('datosDinamicos') as FormArray;
  }
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
  }
  agregarDatoDinamico() {
    console.log(this.selectedValue)
    const datosDinamicosArray = this.historial.get('datosDinamicos') as FormArray;
    const datosDinamicos = this.fb.group({
      clave: '',
      valor: '',
      tipo: this.selectedValue,
    })
    datosDinamicosArray.push(datosDinamicos);
  }

  eliminarDatoDinamico(index: number) {
    const datosDinamicosArray = this.historial.get('datosDinamicos') as FormArray;

    if (index >= 0 && index < datosDinamicosArray.length) {
      datosDinamicosArray.removeAt(index);
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

  onCloseModal(): void {
    if(this.estado === 'historial' && this.data && this.data.historial){
      this.historial.reset;
    }
    this.closeModal.emit();
  }
  cancelarTurno() {
    if(this.data && this.data.id){
      if(this.estado === 'cancelar' || this.estado === 'rechazado'){
        this.data.razon = this.mensaje;
        this.data.estado = 'cancelado';
      }else if(this.estado === 'calificar' || this.estado === 'encuesta'){
        this.data.reviewPac = this.mensaje
      }else if(this.estado === 'finalizado'){
        this.data.reviewEsp = this.mensaje
        this.data.estado = 'finalizado';
      }
      this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
        this.closeModal.emit();
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  isMensajePresente(): boolean {
    return this.mensaje.trim().length > 0;
  }

  addHistorialClinica(){
    if(this.data && this.data.id){
      this.loading = true;
      this.data.historial = this.historial.value;
      this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
        this.loading = false;
        this.closeModal.emit();
      }).catch((err) => {
        this.loading = false;
        this.toastr.error(this.fireError.codeError(err.code), 'Error');
        this.closeModal.emit();
      });
    }
  }
}







// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Turno } from 'src/app/interfaces/Turno';
// import HistorialClinica from 'src/app/interfaces/historialClinica';
// import { TurnoService } from 'src/app/services/turno.service';

// @Component({
//   selector: 'app-modal-turno',
//   templateUrl: './modal-turno.component.html',
//   styleUrls: ['./modal-turno.component.scss']
// })
// export class ModalTurnoComponent implements OnInit {
//   mensaje: string = '';
//   @Input() data?: Turno | null;
//   @Input() estado?: string;
//   @Output() closeModal = new EventEmitter();
//   historial: FormGroup;
 
//   constructor(private turnoServices: TurnoService,  private fb: FormBuilder){
//     this.historial = this.fb.group({
//       altura: ['', [Validators.required, this.validarNumber]],
//       peso: ['', [Validators.required, this.validarNumber]],
//       temperatura: ['', [Validators.required, this.validarNumber]],
//       presion: ['', [Validators.required, this.validarNumber]],
//       clave1:[''],
//       valor1: [''],
//     });
//   }
//   ngOnInit(): void {
//     if(this.estado === 'historial' && this.data && this.data.historial){
//       console.log('entro')
//       this.historial.patchValue(this.data.historial);
//     }
//   }
//   get datosDinamicosArray() {
//     return this.historial.get('datosDinamicos') as FormArray;
//   }
//   agregarDatoDinamico() {
//     this.datosDinamicosArray.push(
//       this.fb.group({
//         clave: ['', Validators.required],
//         valor: ['', Validators.required],
//       })
//     );
//   }
//   eliminarDatoDinamico(index: number) {
//     this.datosDinamicosArray.removeAt(index);
//   }

//   validarNumber(control: AbstractControl): object | null {
//     const data = control.value;
//     const soloNumeros = /^\d+$/;
//     if (!soloNumeros.test(data)) {
//       return { soloNumeros: true };
//     }
//     return null;
//   }
//   onCloseModal(): void {
//     this.closeModal.emit();
//   }
//   cancelarTurno() {
//     if(this.data && this.data.id){
//       if(this.estado === 'cancelar' || this.estado === 'rechazado'){
//         this.data.razon = this.mensaje;
//         this.data.estado = 'cancelado';
//       }else if(this.estado === 'calificar' || this.estado === 'encuesta'){
//         this.data.reviewPac = this.mensaje
//       }else if(this.estado === 'finalizado'){
//         this.data.reviewEsp = this.mensaje
//         this.data.estado = 'finalizado';
//       }
//       this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
//         this.closeModal.emit();
//       }).catch((err) => {
//         console.log(err)
//       })
//     }
//   }
//   isMensajePresente(): boolean {
//     return this.mensaje.trim().length > 0;
//   }
//   addHistorialClinica(){
//     if(this.data && this.data.id){
//       this.data.historial = this.historial.value;
//       this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
//         this.closeModal.emit();
//       }).catch((err) => {
//         console.log(err)
//       })
//     }
//   }
// }
