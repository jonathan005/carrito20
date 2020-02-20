import { TestBed } from '@angular/core/testing';

import { PedidodetalleService } from './pedidodetalle.service';

describe('PedidodetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidodetalleService = TestBed.get(PedidodetalleService);
    expect(service).toBeTruthy();
  });
});
