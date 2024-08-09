import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosSolicitarComponent } from './turnos-solicitar.component';

describe('TurnosSolicitarComponent', () => {
  let component: TurnosSolicitarComponent;
  let fixture: ComponentFixture<TurnosSolicitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosSolicitarComponent]
    });
    fixture = TestBed.createComponent(TurnosSolicitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
