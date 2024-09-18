import { TestBed } from '@angular/core/testing';

import { ListCharacterService } from './list-character.service';

describe('ListCharacterService', () => {
  let service: ListCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
