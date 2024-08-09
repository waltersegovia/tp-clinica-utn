import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTurnoComponent } from './modal-turno.component';

describe('ModalTurnoComponent', () => {
  let component: ModalTurnoComponent;
  let fixture: ComponentFixture<ModalTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTurnoComponent]
    });
    fixture = TestBed.createComponent(ModalTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
