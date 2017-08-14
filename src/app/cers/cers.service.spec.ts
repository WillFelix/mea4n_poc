import { TestBed, inject } from '@angular/core/testing';

import { CersService } from './cers.service';

describe('CersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CersService]
    });
  });

  it('should be created', inject([CersService], (service: CersService) => {
    expect(service).toBeTruthy();
  }));
});
