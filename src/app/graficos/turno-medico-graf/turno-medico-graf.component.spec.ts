import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoMedicoGrafComponent } from './turno-medico-graf.component';

describe('TurnoMedicoGrafComponent', () => {
  let component: TurnoMedicoGrafComponent;
  let fixture: ComponentFixture<TurnoMedicoGrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoMedicoGrafComponent]
    });
    fixture = TestBed.createComponent(TurnoMedicoGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
