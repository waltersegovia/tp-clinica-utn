import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUserComponent } from './section-user.component';

describe('SectionUserComponent', () => {
  let component: SectionUserComponent;
  let fixture: ComponentFixture<SectionUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionUserComponent]
    });
    fixture = TestBed.createComponent(SectionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
