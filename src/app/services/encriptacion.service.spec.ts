import { TestBed } from '@angular/core/testing';

import { EncriptacionService } from './encriptacion.service';

describe('EncriptacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncriptacionService = TestBed.get(EncriptacionService);
    expect(service).toBeTruthy();
  });
});
