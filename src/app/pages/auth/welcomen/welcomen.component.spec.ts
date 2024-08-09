import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomenComponent } from './welcomen.component';

describe('WelcomenComponent', () => {
  let component: WelcomenComponent;
  let fixture: ComponentFixture<WelcomenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomenComponent]
    });
    fixture = TestBed.createComponent(WelcomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
