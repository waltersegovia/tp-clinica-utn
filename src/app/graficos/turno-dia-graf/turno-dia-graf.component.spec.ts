import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoDiaGrafComponent } from './turno-dia-graf.component';

describe('TurnoDiaGrafComponent', () => {
  let component: TurnoDiaGrafComponent;
  let fixture: ComponentFixture<TurnoDiaGrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoDiaGrafComponent]
    });
    fixture = TestBed.createComponent(TurnoDiaGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
