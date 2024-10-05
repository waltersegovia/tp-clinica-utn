// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pacientes-profesional',
//   templateUrl: './pacientes-profesional.component.html',
//   styleUrls: ['./pacientes-profesional.component.scss']
// })
// export class PacientesProfesionalComponent {

// }


import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Profesional } from 'src/app/interfaces/Profesional';
import pdfMake from 'pdfmake/build/pdfmake';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Estado } from 'src/app/components/mis-turnos/mis-turnos.component';

@Component({
  selector: 'app-pacientes-profesional',
  templateUrl: './pacientes-profesional.component.html',
  styleUrls: ['./pacientes-profesional.component.scss'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
    trigger('slideInFromBottom', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms ease-in-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ]),
    ]),
  ],

})
export class PacientesProfesionalComponent implements OnInit {
  miRol: string;
  miUID: string;
  UidProfecional: string;
  idTipo: string = 'idPac';
  pacientes: Paciente[] = [];
  turnos: Turno[] = [];
  estado: Estado = 'cancelar';
  loading: boolean = false;
  turnoSeleccionado: Turno | null = null;
  doctores: Profesional[] = [];
  selectedDoctor: string = '';
  filtro: string = '';
  public usuarios: any;
  filt: number;
  //pacientes: any[];
  //especialista: any;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private otroService: OtroService,
    private turnoService: TurnoService,
    private clinicaFire: ClinicaService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
      this.miRol = ds.data().rol;
      if (this.miRol === 'Profesional') {
        this.idTipo = 'idEsp';
        this.UidProfecional = ds.id;
        
        this.turnoService.getPacientesProfesional(this.UidProfecional).subscribe((data) => {
        
          const pacientesUnicos = data.reduce((acumulador, paciente) => {
            if (!acumulador.find(p => p.id === paciente.id)) {
              acumulador.push(paciente);
            }
            return acumulador;
          }, []);
        
          this.pacientes = pacientesUnicos;
        });
      } else {
        // this.miUID = ds.id;
        // if (this.miRol === 'Administrador') {
        //   this.idTipo = 'idEsp';
        // }
        //obtene todos los pacienete del profesional
        //this.obtenerTurnos(this.idTipo, this.miUID);
      }
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


  //Selecciona el paciente
  handlePatientClick(selectedPatient: Paciente): void {
    if (selectedPatient && selectedPatient.id) {
      this.doctores = []
      this.miUID = selectedPatient.id;
      this.obtenerTurnos();
    }
  }

  obtenerTurnos() {
    this.turnoService
    .getTurnoPorid("idPac", this.miUID)
    .subscribe((data) => {
      // Filtrar los turnos por idEsp
      const turnosFiltrados = data.filter(turno => turno.idEsp === this.UidProfecional);

      this.turnos = turnosFiltrados;
    });
  }

  pacienteFiltrar() {
    this.filt = 0;
    if ((this.filtro || this.filtro.length >= 1) && this.filtro !== null) {

      console.log(this.filtro)
      this.turnos = this.turnos.filter(turno =>
        this.matchFilter(turno, this.filtro.toLowerCase()),

      );

    }


    if (this.filtro.length <= 0) {
      console.log('error', this.filtro)
      this.obtenerTurnos();
      this.changeDetectorRef.detectChanges();
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

  async crearPdf() {
    const bodyData = [];
    bodyData.push(['Especialidad', 'Doctor', 'Historial', 'Fecha', 'Hora']);

    this.turnos.forEach((turno) => {
      if(turno.estado === 'finalizado'){
        const rowData = [
          turno.especialidad,
          this.miRol === 'Profesional' || this.miRol === 'Administrador'
            ? `${turno.especialista.nombre} ${turno.especialista.apellido}`
            : '',
          turno.historial
            ? `Altura: ${turno.historial.altura} - Peso: ${turno.historial.peso} - Temperatura: ${turno.historial.temperatura} \n Presion: ${turno.historial.presion}
             ${turno.historial.datosDinamicos?.map(dato => `${dato['clave']}: ${dato['valor']}`).join('\n') || ''}` // - Clave: ${turno.historial.clave1} - Valor: ${turno.historial.valor1}
            : 'Sin Historial',
          turno.fecha,
          turno.hora,
        ];
  
        bodyData.push(rowData);
      }
    });

    const docDefinition = {
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: ['*', 'auto', '*'],
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL(
                    "../../../assets/icon-clinica.png"
                  ),
                  width: 60, // Ajusta el ancho según tus necesidades
                  alignment: 'left',
                },
                {
                  text: 'Clínica Online', // Nombre de tu clínica
                  style: 'subheader',
                  alignment: 'center',
                },
                {
                  text: `${new Date().toLocaleDateString()}`, // Fecha de emisión
                  alignment: 'right',
                },
              ],
            ],
          },
        },
        { text: '\n' }, // Espacio entre el encabezado y la tabla
        {
          style: 'tableExample',
          table: {
            body: bodyData,
          },
        },
      ],

      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('historial.pdf');
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}





// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-pacientes-profesional',
// //   templateUrl: './pacientes-profesional.component.html',
// //   styleUrls: ['./pacientes-profesional.component.scss']
// // })
// // export class PacientesProfesionalComponent {

// // }


// import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
// import { Paciente } from 'src/app/interfaces/Paciente';
// import { Turno } from 'src/app/interfaces/Turno';
// import { ClinicaService } from 'src/app/services/clinica.service';
// import { OtroService } from 'src/app/services/otro.service';
// import { TurnoService } from 'src/app/services/turno.service';
// import { Profesional } from 'src/app/interfaces/Profesional';
// import pdfMake from 'pdfmake/build/pdfmake';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Estado } from 'src/app/components/mis-turnos/mis-turnos.component';

// @Component({
//   selector: 'app-pacientes-profesional',
//   templateUrl: './pacientes-profesional.component.html',
//   styleUrls: ['./pacientes-profesional.component.scss'],
//   animations: [
//     trigger('slideIn', [
//       state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
//       transition(':enter', [
//         animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
//       ]),
//     ]),
//     trigger('slideInFromBottom', [
//       state('void', style({
//         transform: 'translateY(100%)',
//         opacity: 0
//       })),
//       transition(':enter', [
//         animate('500ms ease-in-out', style({
//           transform: 'translateY(0)',
//           opacity: 1
//         }))
//       ]),
//     ]),
//   ],

// })
// export class PacientesProfesionalComponent implements OnInit {
//   miRol: string;
//   miUID: string;
//   idTipo: string = 'idPac';
//   pacientes: Paciente[] = [];
//   turnos: Turno[] = [];
//   estado: Estado = 'cancelar';
//   loading: boolean = false;
//   turnoSeleccionado: Turno | null = null;
//   doctores: Profesional[] = [];
//   selectedDoctor: string = '';
//   filtro: string = '';
//   public usuarios: any;
//   filt: number;
//   //pacientes: any[];
//   //especialista: any;

//   @ViewChild('scrollContainer') scrollContainer!: ElementRef;

//   constructor(
//     private otroService: OtroService,
//     private turnoService: TurnoService,
//     private clinicaFire: ClinicaService,
//     private changeDetectorRef: ChangeDetectorRef
//   ) { }

//   ngOnInit(): void {
//     this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
//       this.miRol = ds.data().rol;
//       if (this.miRol === 'Profesional') {
//         this.idTipo = 'idEsp';
//         this.miUID = ds.id;
        
//         this.turnoService.getPacientesProfesional(this.miUID).subscribe((data) => {
//           console.log("DATA: " + data);
        
//           // Crear un nuevo arreglo con los pacientes únicos
//           const pacientesUnicos = data.reduce((acumulador, paciente) => {
//             if (!acumulador.find(p => p.id === paciente.id)) {
//               acumulador.push(paciente);
//             }
//             return acumulador;
//           }, []);
        
//           this.pacientes = pacientesUnicos;
//         });
//       } else {
//         this.miUID = ds.id;
//         if (this.miRol === 'Administrador') {
//           this.idTipo = 'idEsp';
//         }
//         //obtene todos los pacienete del profesional
//         //this.obtenerTurnos(this.idTipo, this.miUID);
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


//   //Selecciona el paciente
//   handlePatientClick(selectedPatient: Paciente): void {
//     if (selectedPatient && selectedPatient.id) {
//       this.doctores = []
//       this.miUID = selectedPatient.id;
//       this.obtenerTurnos('idEsp', selectedPatient.idEsp);
//       // this.obtenerTurnos('idPac', selectedPatient.id);
//     }
//   }

//   obtenerTurnos(idTipo: string, miUID: string) {
//     // this.turnoService
//     //   .getTurnoPorid(idTipo, miUID)
//     //   .subscribe((data) => {
       
//     //     this.turnos=data;

//     //   });

//     this.turnoService
//     .getTurnoPorid(idTipo, miUID)
//     .subscribe((data) => {
//       // Filtrar turnos atendidos por el médico actual (miUID)
//       const turnosAtendidos = data.filter(
//         (turno) => turno.idEsp === this.miUID && turno.estado === 'finalizado' // Filtra por estado finalizado
//       );

//       this.turnos = turnosAtendidos;
//     });
//   }

//   pacienteFiltrar() {
//     this.filt = 0;
//     if ((this.filtro || this.filtro.length >= 1) && this.filtro !== null) {

//       console.log(this.filtro)
//       this.turnos = this.turnos.filter(turno =>
//         this.matchFilter(turno, this.filtro.toLowerCase()),

//       );

//     }


//     if (this.filtro.length <= 0) {
//       console.log('error', this.filtro)
//       this.obtenerTurnos(this.idTipo, this.miUID);
//       this.changeDetectorRef.detectChanges();
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

//   async crearPdf() {
//     const bodyData = [];
//     bodyData.push(['Especialidad', 'Doctor', 'Historial', 'Fecha', 'Hora']);

//     this.turnos.forEach((turno) => {
//       const rowData = [
//         turno.especialidad,
//         this.miRol === 'Profesional' || this.miRol === 'Administrador'
//           ? `${turno.especialista.nombre} ${turno.especialista.apellido}`
//           : '',
//         turno.historial
//           ? `Altura: ${turno.historial.altura} - Peso: ${turno.historial.peso} - Temperatura: ${turno.historial.temperatura} \n Presion: ${turno.historial.presion}
//            ${turno.historial.datosDinamicos?.map(dato => `${dato['clave']}: ${dato['valor']}`).join('\n') || ''}` // - Clave: ${turno.historial.clave1} - Valor: ${turno.historial.valor1}
//           : 'Sin Historial',
//         turno.fecha,
//         turno.hora,
//       ];

//       bodyData.push(rowData);
//     });

//     const docDefinition = {
//       content: [
//         {
//           layout: 'noBorders',
//           table: {
//             widths: ['*', 'auto', '*'],
//             body: [
//               [
//                 {
//                   image: await this.getBase64ImageFromURL(
//                     "../../../assets/icon-clinica.png"
//                   ),
//                   width: 60, // Ajusta el ancho según tus necesidades
//                   alignment: 'left',
//                 },
//                 {
//                   text: 'Clínica Online', // Nombre de tu clínica
//                   style: 'subheader',
//                   alignment: 'center',
//                 },
//                 {
//                   text: `${new Date().toLocaleDateString()}`, // Fecha de emisión
//                   alignment: 'right',
//                 },
//               ],
//             ],
//           },
//         },
//         { text: '\n' }, // Espacio entre el encabezado y la tabla
//         {
//           style: 'tableExample',
//           table: {
//             body: bodyData,
//           },
//         },
//       ],

//       styles: {
//         subheader: {
//           fontSize: 16,
//           bold: true,
//           margin: [0, 10, 0, 5],
//         },
//         tableExample: {
//           margin: [0, 5, 0, 15],
//         },
//       },
//     };

//     pdfMake.createPdf(docDefinition).download('historial.pdf');
//   }

//   getBase64ImageFromURL(url: string) {
//     return new Promise((resolve, reject) => {
//       var img = new Image();
//       img.setAttribute("crossOrigin", "anonymous");

//       img.onload = () => {
//         var canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         var ctx = canvas.getContext("2d");
//         ctx!.drawImage(img, 0, 0);

//         var dataURL = canvas.toDataURL("image/png");

//         resolve(dataURL);
//       };

//       img.onerror = error => {
//         reject(error);
//       };

//       img.src = url;
//     });
//   }
// }
