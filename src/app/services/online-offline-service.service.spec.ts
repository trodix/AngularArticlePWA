import { TestBed } from '@angular/core/testing';

import { OnlineOfflineServiceService } from './online-offline-service.service';

describe('OnlineOfflineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineOfflineServiceService = TestBed.get(OnlineOfflineServiceService);
    expect(service).toBeTruthy();
  });
});
