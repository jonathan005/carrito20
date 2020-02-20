import { TestBed, async, inject } from '@angular/core/testing';

import { OtherGuardGuard } from './other-guard.guard';

describe('OtherGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherGuardGuard]
    });
  });

  it('should ...', inject([OtherGuardGuard], (guard: OtherGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
