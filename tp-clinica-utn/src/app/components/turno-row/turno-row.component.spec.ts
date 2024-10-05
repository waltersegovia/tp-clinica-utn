import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoRowComponent } from './turno-row.component';

describe('TurnoRowComponent', () => {
  let component: TurnoRowComponent;
  let fixture: ComponentFixture<TurnoRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoRowComponent]
    });
    fixture = TestBed.createComponent(TurnoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
