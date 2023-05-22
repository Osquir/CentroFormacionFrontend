import { TestBed } from '@angular/core/testing';

import { AlumnoCursoService } from './alumno-curso.service';

describe('AlumnoCursoService', () => {
  let service: AlumnoCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
