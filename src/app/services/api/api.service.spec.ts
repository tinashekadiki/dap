import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

import {environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`customerRecordsUrl has default value`, () => {
    expect(service.customerRecordsUrl).toEqual(environment.customerRecordsUrl);
  });

  it(`dealerSmsSubmitDataUrl has default value`, () => {
    expect(service.dealerSmsSubmitDataUrl).toEqual(environment.dealerFormData);
  });

  it(`dealerSmsUrlLogconsent has default value`, () => {
    expect(service.dealerSmsUrlLogconsent).toEqual(environment.logConsentUrl);
  });

  it(`dealerSmsNew has default value`, () => {
    expect(service.dealerSmsNew).toEqual(environment.newDealerSmsUrl);
  });

  it(`checkLinkValidUrl has default value`, () => {
    expect(service.checkLinkValidUrl).toEqual(environment.checkLinkValidityUrl);
  });

  it(`customerInteractionBaseUrl has default value`, () => {
    expect(service.customerInteractionBaseUrl).toEqual(
      environment.customerInteractionBaseUrl
    );
  });

  it(`token has default value`, () => {
    expect(service.token).toEqual(environment.token);
  });

  it(`ipAddressLink has default value`, () => {
    expect(service.ipAddressLink).toEqual(environment.ipAddressLink);
  });

  it(`postDisclosureLink has default value`, () => {
    expect(service.postDisclosureLink).toEqual(environment.postDisclosureUrl);
  });

  it(`postApplicationCompleteUrl has default value`, () => {
    expect(service.postApplicationCompleteUrl).toEqual(
      environment.postApplicationCompleteUrl
    );
  });

  it(`saveApplicationUrl has default value`, () => {
    expect(service.saveApplicationUrl).toEqual(environment.saveApplicationUrl);
  });

  it(`previewApplicationUrl has default value`, () => {
    expect(service.previewApplicationUrl).toEqual(
      environment.previewApplicationUrl
    );
  });

  describe('getIPAddress', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getIPAddress().subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('http://api.ipify.org/?format=json');
      expect(req.request.method).toEqual('GET');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('getDealerSmsData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getDealerSmsData('TAE44118DECDD14OHM4991AX195056BLU', {}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/getCustomer/TAE44118DECDD14OHM4991AX195056BLU');
      expect(req.request.method).toEqual('GET');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('postCustomerRecords', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.postCustomerRecords({}, 'TAE44118DECDD14OHM4991AX195056BLU').subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('http://74.208.48.114/customer-records-v2/customer/profile');
      expect(req.request.method).toEqual('POST');
      // req.flush();
      httpTestingController.verify();
    });
  });


  describe('postDealerSmsData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.postDealerSmsData({}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('http://74.208.48.114/dealform-sms-service/api/v1/dealerformdata/');
      expect(req.request.method).toEqual('POST');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('postLogConsent', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.postLogConsent({}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('http://74.208.48.114/dealform-sms-service/api/v1/logconsent/');
      expect(req.request.method).toEqual('POST');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('checkLinkValid', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.checkLinkValid("3fe9fa6da29e0030000af19cdb3b244f").subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/LinkClicked/3fe9fa6da29e0030000af19cdb3b244f');
      expect(req.request.method).toEqual('POST');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('postDisclosure', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.postDisclosure({}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/SendDisclosure');
      expect(req.request.method).toEqual('POST');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('postApplicationComplete', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.postApplicationComplete("3fe9fa6da29e0030000af19cdb3b244f").subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/ApplicationComplete/3fe9fa6da29e0030000af19cdb3b244f');
      expect(req.request.method).toEqual('PUT');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('saveApplication', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.saveApplication({}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/SaveApplication');
      expect(req.request.method).toEqual('PUT');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('previewApplication', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.previewApplication({}).subscribe(res => {
        expect(res).toBeTrue();
      });
      const req = httpTestingController.expectOne('https://asgard.qubedlab.com/customer-interaction-service/PreviewApplication/[object Object]');
      expect(req.request.method).toEqual('GET');
      // req.flush();
      httpTestingController.verify();
    });
  });

  describe('httpOptionsAuth', () => {
    it('makes expected calls', () => {
      expect(service.httpOptionsAuth("3fe9fa6da29e0030000af19cdb3b244f")).toEqual({
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer 3fe9fa6da29e0030000af19cdb3b244f' 
          }
      })
    });
  });
  
});
