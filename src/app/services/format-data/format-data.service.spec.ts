import { TestBed } from '@angular/core/testing';
import { FormatDataService } from './format-data.service';

describe('FormatDataService', () => {
  let service: FormatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FormatDataService] });
    service = TestBed.inject(FormatDataService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('shot formatSsn', () => {
    expect(service.formatSsn('000000000')).toEqual('000-00-0000');
  })

  it('should formatDate', () => {
     expect(service.formatDate('2021-05-07T11:07:01.313+00:00')).toEqual('05/7/2021');
  })

  it('should formatDateOnInput', () => {
    expect(service.formatDateOnInput('00')).toEqual('00/');
  })

  it('should formatCurrency', () => {
    expect(service.formatCurrency('120')).toEqual('$120');
    spyOn(service, 'undoCurrencyFormat').and.callThrough();
    service.formatCurrency('$120');
    expect(service.undoCurrencyFormat).toHaveBeenCalled()
  })
  it('should undoCurrencyFormat', () => {
    expect(service.undoCurrencyFormat('$120')).toEqual('120'); 
  })
});
