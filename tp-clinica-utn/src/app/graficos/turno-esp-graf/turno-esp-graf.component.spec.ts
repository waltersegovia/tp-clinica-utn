import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoEspGrafComponent } from './turno-esp-graf.component';

describe('TurnoEspGrafComponent', () => {
  let component: TurnoEspGrafComponent;
  let fixture: ComponentFixture<TurnoEspGrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoEspGrafComponent]
    });
    fixture = TestBed.createComponent(TurnoEspGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
