import { TestBed } from '@angular/core/testing';

import { CambiarPaswordService } from './cambiar-pasword.service';

describe('CambiarPaswordService', () => {
  let service: CambiarPaswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarPaswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
