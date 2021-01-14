import { TestBed } from '@angular/core/testing';

import { EngineFactoryService } from './engine-factory.service';

describe('EngineFactoryService', () => {
  let service: EngineFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
