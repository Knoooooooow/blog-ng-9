import { TestBed } from '@angular/core/testing';

import { ExtensionLoaderService } from './extension-loader.service';

describe('ExtensionLoaderService', () => {
  let service: ExtensionLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensionLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
