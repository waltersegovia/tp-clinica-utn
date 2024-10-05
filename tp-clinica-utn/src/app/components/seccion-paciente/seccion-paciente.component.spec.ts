import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionPacienteComponent } from './seccion-paciente.component';

describe('SeccionPacienteComponent', () => {
  let component: SeccionPacienteComponent;
  let fixture: ComponentFixture<SeccionPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeccionPacienteComponent]
    });
    fixture = TestBed.createComponent(SeccionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
