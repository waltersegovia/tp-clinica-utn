import { TestBed } from '@angular/core/testing';

import { DiaHorarioService } from './dia-horario.service';

describe('DiaHorarioService', () => {
  let service: DiaHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
