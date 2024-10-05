import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Especialidad from 'src/app/interfaces/Especialidad';
import { Profesional } from 'src/app/interfaces/Profesional';
import { ClinicaService } from 'src/app/services/clinica.service';
export type idRef = {
  id?: string;
  especialidadRef: string;
};
@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss'],
})
export class ModalUsuarioComponent implements OnInit {
  @Input() data?: Profesional | null;
  @Output() closeModal = new EventEmitter();
  especialidades: Especialidad[] = [];
  idref: idRef[] = [];

  constructor(private clinicaFire: ClinicaService) {}
  
  ngOnInit(): void {
    if (this.data) {
      const id = this.data.id;
      if (id) {
        this.clinicaFire.getEspecialidadProfesional(id).subscribe((data) => {
          this.idref = data;
          this.clinicaFire.getEspecialidad().subscribe((datos) => {
            this.especialidades = datos;
            this.especialidades = this.especialidades.filter((especialidad) => {
              return this.idref.some(
                (d) => d.especialidadRef === especialidad.id
              );
            });
          });
        });
      }
    }
  }
  onCloseModal(): void {
    this.closeModal.emit();
  }
}
