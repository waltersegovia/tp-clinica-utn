import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEspecialidadComponent } from './tabla-especialidad.component';

describe('TablaEspecialidadComponent', () => {
  let component: TablaEspecialidadComponent;
  let fixture: ComponentFixture<TablaEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaEspecialidadComponent]
    });
    fixture = TestBed.createComponent(TablaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
