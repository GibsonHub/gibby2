import { TestBed } from '@angular/core/testing';

import { IndependantExchangeService } from './independant-exchange.service';

describe('IndependantExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndependantExchangeService = TestBed.get(IndependantExchangeService);
    expect(service).toBeTruthy();
  });
});
