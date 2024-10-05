import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogGraficoComponent } from './log-grafico.component';

describe('LogGraficoComponent', () => {
  let component: LogGraficoComponent;
  let fixture: ComponentFixture<LogGraficoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogGraficoComponent]
    });
    fixture = TestBed.createComponent(LogGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
