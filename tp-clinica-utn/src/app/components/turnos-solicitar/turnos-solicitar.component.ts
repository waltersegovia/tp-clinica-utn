import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Especialidad from 'src/app/interfaces/Especialidad';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Profesional } from 'src/app/interfaces/Profesional';
import Reserva from 'src/app/interfaces/Reserva';
import { Turno } from 'src/app/interfaces/Turno';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-solicitar',
  templateUrl: './turnos-solicitar.component.html',
  styleUrls: ['./turnos-solicitar.component.scss'],
})
export class TurnosSolicitarComponent implements OnInit {
  idPac: string = '';
  idEsp: string = '';
  loading: boolean = false;
  especialidades: Especialidad[] = [];
  selectedEspecialidad: string = '';

  especialidadDetails!: FormGroup;
  img: string = '../../assets/icon-clinica.png';
  profesionales: Profesional[] = [];
  selectedProfesional: Profesional | null = null;
  selectedPaciente!: any;

  reservasProfesional: Reserva[] = [];
  selectedReserva: Reserva | null = null;
  itemSelected: number | null = null;

  fecha: string = '';
  selecHora: string = '';
  turnoSolicitado!: Turno;
  especialida_step = false;
  profecional_step = false;
  fecha_step = false;
  hora_step = false;
  confirmar_step = false;
  miRol: string = '';
  step = 1;
  public usuarios: any;
  private paciente: Paciente;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private clinicaFire: ClinicaService,
    private clinicaFire2: ClinicaService,
    private authFire: AuthService,
    private turnosFire: TurnoService,
    private otroService: OtroService,
    private toastr: ToastrService,
    private fireError: FireErrorService,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit() {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.miRol = ds.data().rol;
        if (this.miRol == 'Administrador') {
        
          this.route.params.subscribe(params => {
            this.idPac = params['id'];
            console.log('ID del turno:'+ this.idPac);
            // Aquí puedes utilizar el idTurno para cargar los datos del turno, etc.
            if (this.idPac !== null) {
              this.clinicaFire.getUserByID(this.idPac).then(resp => {
                this.selectedPaciente = resp.data() as Paciente;
                //this.idPac = this.selectedPaciente.id;
              })
            } 
          });
                
        } else if (this.miRol == 'Paciente') {
          this.clinicaFire.getUserByID(ds.id).then(resp => {
            this.idPac = ds.id;
            this.selectedPaciente = resp.data() as Paciente;
          })
        } 

      }
    )
    this.clinicaFire.getEspecialidad().subscribe((resp) => {
      this.especialidades = resp;
    });
    this.especialidadDetails = this.formBuilder.group({
      especialidad: [null, Validators.required],
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
  // handlePatientClick(selectedPatient: Paciente): void {
  //   if (selectedPatient && selectedPatient.id) {
  //     this.doctores = []
  //     this.miUID = selectedPatient.id;
  //     this.obtenerTurnos('idPac', selectedPatient.id);
  //   }
  // } 

  selectProfesional(profesional: Profesional) {
    this.selectedProfesional = profesional;
    if (this.selectedProfesional && this.selectedProfesional.id) {
      this.idEsp = this.selectedProfesional.id;

      this.clinicaFire
        .getHorariosDisponibles(this.selectedProfesional.id)
        .subscribe((reservas) => {
          this.reservasProfesional = reservas;
        });
    }
  }

  next() {
    if (this.step == 1) {
      const especialidadElegida = this.especialidadDetails.value.especialidad;
      this.onEspecialidadSeleccionadaHandler(especialidadElegida);
      this.especialida_step = true;
      this.step++;
    } else if (this.step == 2) {
      this.profecional_step = true;
      this.step++;
    } else if (this.step == 3) {
      this.fecha_step = true;
      this.onRellenarTurno();
      this.step++;
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.especialida_step = false;
    }
    if (this.step == 2) {
      this.profecional_step = false;
    }
    if (this.step == 3) {
      this.fecha_step = false;
    }
  }

  submit() {
    this.loading = true;
    this.turnosFire
      .add(this.turnoSolicitado)
      .then(() => {
        this.selectedReserva.horarios[this.itemSelected] = false;
        this.clinicaFire.updateHorariosDisponible(this.selectedProfesional.id, this.selectedReserva)
          .then(() => {
            this.loading = false;
            this.toastr.success('El Turno se registro correctamente', 'Success');
            this.step = 1
            this.especialida_step = false;
            console.log('se agrego correctamente');
          })
          .catch((er) => {
            this.loading = false;
            if (er.message) {
              this.toastr.error(er.message, 'Error');
            } else {
              this.toastr.error('ST', 'Error');
            }
          });
      })
      .catch((er) => {
        this.loading = false;
        if (er.message) {
          this.toastr.error(er.message, 'Error');
        } else {
          this.toastr.error(this.fireError.codeError(er.code), 'Error');
        }
      });
  }
  onRellenarTurno() {
    if (this.selectedProfesional !== null) {
      this.turnoSolicitado = {
        idEsp: this.idEsp,
        idPac: this.idPac,
        especialista: this.selectedProfesional,
        paciente: this.selectedPaciente,
        fecha: this.fecha,
        hora: this.selecHora,
        especialidad: this.especialidadDetails.value.especialidad,
        estado: 'reservado',
        reviewEsp: '',
        reviewPac: '',
      };
    }
  }
  onEspecialidadSeleccionadaHandler(especialidad: string) {
    this.especialidadDetails.get('especialidad')?.setValue(especialidad);
    this.clinicaFire
      .getProFesionalPorEspecialidad(especialidad)
      .subscribe((profesionales: Profesional[]) => {
        this.profesionales = profesionales;
      });
  }
  onselectReserva(hora: number, reserva: Reserva) {
    this.fecha = reserva.fecha;
    this.selecHora = this.gethora(hora);
    this.selectedReserva = reserva;
    this.itemSelected = hora;
  }
  onselectHora(hora: string) {
    this.selecHora = hora;
  }
  getBackgroundImage(img: string): string {
    if (img.trim() === '') {
      // Si no hay imagen, utiliza una imagen por defecto
      return 'url("../../../assets/icon-clinica.png")'; // Ajusta la ruta según tu estructura de archivos
    } else {
      // Si hay una imagen, utiliza la URL proporcionada
      return `url('${img}')`;
    }
  }

  gethora(hora: number): string {
    switch (hora) {
      case 0:
        return "8:00hs";
      case 1:
        return "9:00hs";
      case 2:
        return "10:00hs";
      case 3:
        return "11:00hs";
      case 4:
        return "12:00hs";
      case 5:
        return "13:00hs";
      case 6:
        return "14:00hs";
      case 7:
        return "15:00hs";
      default:
        return "Invalid hora value"; // Handle invalid input
    }
  }
}
