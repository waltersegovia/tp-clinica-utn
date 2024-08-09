import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfPendientesComponent } from './list-prof-pendientes.component';

describe('ListProfPendientesComponent', () => {
  let component: ListProfPendientesComponent;
  let fixture: ComponentFixture<ListProfPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProfPendientesComponent]
    });
    fixture = TestBed.createComponent(ListProfPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
