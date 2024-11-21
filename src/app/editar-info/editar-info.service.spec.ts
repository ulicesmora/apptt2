import { TestBed } from '@angular/core/testing';

import { EditarInfoService } from './editar-info.service';

describe('EditarInfoService', () => {
  let service: EditarInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
