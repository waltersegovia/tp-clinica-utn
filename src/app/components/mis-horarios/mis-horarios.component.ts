import { Component, EventEmitter, Output } from '@angular/core';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent {
  @Output() volver = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  miUid: string = '';
  agenda: boolean[] = [];
  nuevaAgenda: boolean[] = [];
  mockAgenda: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  semana: string[] = [
    'Domingos',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábados'
  ];

  constructor(
    private usuarioService: ClinicaService,
    private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.miUid = ds.id;
        this.agenda = ds.data().agenda ? ds.data().agenda : this.mockAgenda;
        this.nuevaAgenda = this.agenda.slice();
      }
    );
  }

  confirmar() {
    this.usuarioService.updateProfesionalAgenda(this.miUid, this.nuevaAgenda)
    .then(
      () => this.volver.emit()
    );
  }

  onDiaClickeado(indice: number) {
    this.nuevaAgenda[indice] = !this.nuevaAgenda[indice];
  }
  onCloseModal(): void {
    this.closeModal.emit();
  }
}
