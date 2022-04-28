import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    const toastrServiceStub = () => ({
      success: (message, messageHeader) => ({}),
      error: (message, messageHeader) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: ToastrService, useFactory: toastrServiceStub }
      ]
    });
    service = TestBed.inject(AlertService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
