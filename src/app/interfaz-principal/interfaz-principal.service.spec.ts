import { TestBed } from '@angular/core/testing';

import { InterfazPrincipalService } from './interfaz-principal.service';

describe('InterfazPrincipalService', () => {
  let service: InterfazPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfazPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
