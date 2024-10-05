import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesProfesionalComponent } from './pacientes-profesional.component';

describe('PacientesProfesionalComponent', () => {
  let component: PacientesProfesionalComponent;
  let fixture: ComponentFixture<PacientesProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesProfesionalComponent]
    });
    fixture = TestBed.createComponent(PacientesProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
