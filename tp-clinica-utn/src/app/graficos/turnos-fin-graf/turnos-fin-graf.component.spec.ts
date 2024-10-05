import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosFinGrafComponent } from './turnos-fin-graf.component';

describe('TurnosFinGrafComponent', () => {
  let component: TurnosFinGrafComponent;
  let fixture: ComponentFixture<TurnosFinGrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosFinGrafComponent]
    });
    fixture = TestBed.createComponent(TurnosFinGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
