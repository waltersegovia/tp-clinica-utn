import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDiaHorarioComponent } from './alta-dia-horario.component';

describe('AltaDiaHorarioComponent', () => {
  let component: AltaDiaHorarioComponent;
  let fixture: ComponentFixture<AltaDiaHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaDiaHorarioComponent]
    });
    fixture = TestBed.createComponent(AltaDiaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
