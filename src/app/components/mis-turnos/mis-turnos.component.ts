import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
export type Estado =
  | 'cancelar'
  | 'resena'
  | 'calificar'
  | 'encuesta'
  | 'rechazado'
  | 'finalizado'
  | 'historial';


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  animations: [
        trigger('slideInOut', [
          state('in', style({ transform: 'translateX(0)' })),
          transition('void => *', [
            style({ transform: 'translateX(-100%)' }),
            animate(600)
          ]),
          transition('* => void', [
            animate(2000, style({ transform: 'translateX(100%)' }))
          ])
        ])
      ]
})


export class MisTurnosComponent implements OnInit{
  turnosOriginal: any[] = [];
  turnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  estado: Estado = 'cancelar';
  filtro: string = '';
  miRol: string = '';
  miUID: string = '';
  idTipo: string = '';
  loading: boolean = false;
  filtroSubject = new Subject<string>();
  isVisible = true;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
 

  constructor(
    private turnoService: TurnoService,
    private otroService: OtroService,
    private usuarioService: ClinicaService
  ) {}
  
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
      this.miRol = ds.data().rol;
      if (this.miRol === 'Administrador') {
        this.turnoService.getTurnos().subscribe((data) => (this.turnos = data));
      } else {
        this.miUID = ds.id;
        if (this.miRol === 'Paciente') {
          this.idTipo = 'idPac';
        } else if (this.miRol === 'Profesional') {
          this.idTipo = 'idEsp';
        }
        this.obtenerTurnos(this.idTipo, this.miUID);
       
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  //@HostListener('document:scroll', ['$event'])
 onScroll(event: Event): void {
    const container = event.target as HTMLElement;

    // Verifica si el usuario ha llegado al final del contenedor
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Lógica para cargar más elementos aquí
      // Puedes llamar a un método que cargue más elementos en 'profPendientes'
    }
  }

  pacienteFiltrar() {
    if (this.filtro) {
      this.turnos = this.turnos.filter(turno =>
        this.matchFilter(turno, this.filtro.toLowerCase())
      );
    } else {
      this.obtenerTurnos(this.idTipo, this.miUID);
    }
  }
  matchFilter(turno: Turno, filtro: string): boolean {
    const lowerCaseFiltro = filtro.toLowerCase();
    const historiaClinicaMatches = () => {
      if (turno.historial) {
        const historialValues = Object.values(turno.historial);
        return historialValues.some(value =>
          String(value).toLowerCase().includes(lowerCaseFiltro)
        );
      }
      return false;
    };
    return (
      turno.especialidad.toLowerCase().includes(lowerCaseFiltro) ||
      turno.especialista.nombre.toLowerCase().includes(lowerCaseFiltro) ||
      turno.especialista.apellido.toLowerCase().includes(lowerCaseFiltro) ||
      historiaClinicaMatches()
    );
  }

  obtenerTurnos(idTipo: string, miUID: string) {
    this.turnoService
      .getTurnoPorid(idTipo, miUID)
      .subscribe((data) => (this.turnos = data));
  }

  especialistaFiltrar() {
    if (this.filtro) {
      this.turnos = this.turnos.filter(turno =>
        this.matchFilterEspecialista(turno, this.filtro.toLowerCase())
      );
    } else {
      this.obtenerTurnos(this.idTipo, this.miUID);
    }
  }
  matchFilterEspecialista(turno: Turno, filtro: string): boolean {
    const lowerCaseFiltro = filtro.toLowerCase();
  
    const historiaClinicaMatches = () => {
      if (turno.historial) {
        const historialValues = Object.values(turno.historial);
  
        // Filtrar datos estáticos del historial
        const staticMatches = historialValues.some(value =>
          String(value).toLowerCase().includes(lowerCaseFiltro)
        );
  
        // Filtrar datos dinámicos del historial
        const dynamicMatches = turno.historial.datosDinamicos.some(datoDinamico => {
          return Object.entries(datoDinamico).some(([clave, valor]) => {
            return (
              clave.toLowerCase().includes(lowerCaseFiltro) || 
              String(valor).toLowerCase().includes(lowerCaseFiltro)
            );
          });
        });
  
        return staticMatches || dynamicMatches;
      }
      return false;
    };

    return (
      turno.especialidad.toLowerCase().includes(lowerCaseFiltro) ||
      turno.paciente.nombre.toLowerCase().includes(lowerCaseFiltro) ||
      turno.paciente.apellido.toLowerCase().includes(lowerCaseFiltro) ||
      historiaClinicaMatches()
    );
  }

  cancelarTurnoHandler(turno: Turno | null) {
    this.estado = 'cancelar';
    this.turnoSeleccionado = turno;
  }

  verReviewHandler(turno: Turno | null) {
    this.estado = 'resena';
    this.turnoSeleccionado = turno;
  }

  calificarAtencionHandler(turno: any) {
    this.estado = 'calificar';
    this.turnoSeleccionado = turno;
  }

  completarEncuestaHandler(turno: Turno | null) {
    this.estado = 'encuesta';
    this.turnoSeleccionado = turno;
  }

  rechazarTurnoHandler(turno: Turno | null) {
    this.estado = 'rechazado';
    this.turnoSeleccionado = turno;
  }
  aceptarTurnoHandler(turno: Turno) {
    if (turno.id) {
      this.loading = true;
      turno.estado = 'aceptado';
      this.turnoService
        .actualizar(turno.id, turno)
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  finalizarTurnoHandler(turno: Turno | null) {
    this.estado = 'finalizado';
    this.turnoSeleccionado = turno;
  }
  
  crearHistorialClinica(turno: Turno | null) {
    this.estado = 'historial';
    this.turnoSeleccionado = turno;
  }
}



// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
// import { Turno } from 'src/app/interfaces/Turno';
// import { ClinicaService } from 'src/app/services/clinica.service';
// import { OtroService } from 'src/app/services/otro.service';
// import { ReservaService } from 'src/app/services/reserva.service';
// import { TurnoService } from 'src/app/services/turno.service';
// export type Estado =
//   | 'cancelar'
//   | 'resena'
//   | 'calificar'
//   | 'encuesta'
//   | 'rechazado'
//   | 'finalizado'
//   | 'historial';
// @Component({
//   selector: 'app-mis-turnos',
//   templateUrl: './mis-turnos.component.html',
//   styleUrls: ['./mis-turnos.component.scss'],
//   animations: [
//     trigger('slideInOut', [
//       state('in', style({ transform: 'translateX(0)' })),
//       transition('void => *', [
//         style({ transform: 'translateX(-100%)' }),
//         animate(600)
//       ]),
//       transition('* => void', [
//         animate(2000, style({ transform: 'translateX(100%)' }))
//       ])
//     ])
//   ]
// })


// export class MisTurnosComponent {
//   turnosOriginal: any[] = [];
//   turnos: Turno[] = [];
//   turnoSeleccionado: Turno | null = null;
//   estado: Estado = 'cancelar';
//   filtro: string = '';
//   miRol: string = '';
//   miUID: string = '';
//   idTipo: string = '';
//   loading: boolean = false;

//   @ViewChild('scrollContainer') scrollContainer!: ElementRef;
//   isVisible = true;

//   constructor(
//     private turnoService: TurnoService,
//     private otroService: OtroService,
//     private usuarioService: ClinicaService
//   ) {}

  

//   toggleVisibility() {
//     this.isVisible = !this.isVisible;
//   }

//   ngOnInit(): void {
//     this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
//       this.miRol = ds.data().rol;
//       if (this.miRol === 'Administrador') {
//         this.turnoService.getTurnos().subscribe((data) => (this.turnos = data));
//       } else {
//         this.miUID = ds.id;
//         if (this.miRol === 'Paciente') {
//           this.idTipo = 'idPac';
//         } else if (this.miRol === 'Profesional') {
//           this.idTipo = 'idEsp';
//         }
//         this.obtenerTurnos(this.idTipo, this.miUID);
//       }
//     });
//   }

//   @HostListener('window:scroll', ['$event'])
  
//   onScroll(event: Event): void {
//     const container = event.target as HTMLElement;

//     // Verifica si el usuario ha llegado al final del contenedor
//     if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
//       // Lógica para cargar más elementos aquí
//       // Puedes llamar a un método que cargue más elementos en 'profPendientes'
//     }
//   }

//   pacienteFiltrar() {
//     if (this.filtro) {
//       this.turnos = this.turnos.filter(turno =>
//         this.matchFilter(turno, this.filtro.toLowerCase())
//       );
//     } else {
//       this.obtenerTurnos(this.idTipo, this.miUID);
//     }
//   }
//   matchFilter(turno: Turno, filtro: string): boolean {
//     const lowerCaseFiltro = filtro.toLowerCase();
//     const historiaClinicaMatches = () => {
//       if (turno.historial) {
//         const historialValues = Object.values(turno.historial);
//         return historialValues.some(value =>
//           String(value).toLowerCase().includes(lowerCaseFiltro)
//         );
//       }
//       return false;
//     };
//     return (
//       turno.especialidad.toLowerCase().includes(lowerCaseFiltro) ||
//       turno.especialista.nombre.toLowerCase().includes(lowerCaseFiltro) ||
//       turno.especialista.apellido.toLowerCase().includes(lowerCaseFiltro) ||
//       historiaClinicaMatches()
//     );
//   }

//   obtenerTurnos(idTipo: string, miUID: string) {
//     this.turnoService
//       .getTurnoPorid(idTipo, miUID)
//       .subscribe((data) => (this.turnos = data));
//   }

//   especialistaFiltrar() {
//     if (this.filtro) {
//       this.turnos = this.turnos.filter(turno =>
//         this.matchFilterEspecialista(turno, this.filtro.toLowerCase())
//       );
//     } else {
//       this.obtenerTurnos(this.idTipo, this.miUID);
//     }
//   }
//   matchFilterEspecialista(turno: Turno, filtro: string): boolean {
//     const lowerCaseFiltro = filtro.toLowerCase();
  
//     const historiaClinicaMatches = () => {
//       if (turno.historial) {
//         const historialValues = Object.values(turno.historial);
//         return historialValues.some(value =>
//           String(value).toLowerCase().includes(lowerCaseFiltro)
//         );
//       }
//       return false;
//     };
//     return (
//       turno.especialidad.toLowerCase().includes(lowerCaseFiltro) ||
//       turno.paciente.nombre.toLowerCase().includes(lowerCaseFiltro) ||
//       turno.paciente.apellido.toLowerCase().includes(lowerCaseFiltro) ||
//       historiaClinicaMatches()
//     );
//   }

//   cancelarTurnoHandler(turno: Turno | null) {
//     this.estado = 'cancelar';
//     this.turnoSeleccionado = turno;
//   }

//   verReviewHandler(turno: Turno | null) {
//     this.estado = 'resena';
//     this.turnoSeleccionado = turno;
//   }

//   calificarAtencionHandler(turno: any) {
//     this.estado = 'calificar';
//     this.turnoSeleccionado = turno;
//   }

//   completarEncuestaHandler(turno: Turno | null) {
//     this.estado = 'encuesta';
//     this.turnoSeleccionado = turno;
//   }

//   rechazarTurnoHandler(turno: Turno | null) {
//     this.estado = 'rechazado';
//     this.turnoSeleccionado = turno;
//   }
//   aceptarTurnoHandler(turno: Turno) {
//     if (turno.id) {
//       this.loading = true;
//       turno.estado = 'aceptado';
//       this.turnoService
//         .actualizar(turno.id, turno)
//         .then(() => {
//           this.loading = false;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }

//   finalizarTurnoHandler(turno: Turno | null) {
//     this.estado = 'finalizado';
//     this.turnoSeleccionado = turno;
//   }
//   crearHistorialClinica(turno: Turno | null) {
//     this.estado = 'historial';
//     this.turnoSeleccionado = turno;
//   }
// }
