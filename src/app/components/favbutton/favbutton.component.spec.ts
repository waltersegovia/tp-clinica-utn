import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavbuttonComponent } from './favbutton.component';

describe('FavbuttonComponent', () => {
  let component: FavbuttonComponent;
  let fixture: ComponentFixture<FavbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavbuttonComponent]
    });
    fixture = TestBed.createComponent(FavbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
