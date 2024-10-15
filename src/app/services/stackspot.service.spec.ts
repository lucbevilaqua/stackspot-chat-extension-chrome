import { TestBed } from '@angular/core/testing';

import { StackspotService } from './stackspot.service';

describe('StackspotService', () => {
  let service: StackspotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackspotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
