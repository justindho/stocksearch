import { TestBed } from '@angular/core/testing';

import { AutocompletionLoadingService } from './autocompletion-loading.service';

describe('AutocompletionLoadingService', () => {
  let service: AutocompletionLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompletionLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
