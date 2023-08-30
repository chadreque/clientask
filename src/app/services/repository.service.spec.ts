import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: RepositoryService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositoryService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
