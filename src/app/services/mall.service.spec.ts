import { TestBed } from '@angular/core/testing';

import { MallService } from './mall.service';

describe('MallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MallService = TestBed.get(MallService);
    expect(service).toBeTruthy();
  });
});
