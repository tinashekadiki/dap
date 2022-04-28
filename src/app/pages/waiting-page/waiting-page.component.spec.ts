import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { WaitingPageComponent } from './waiting-page.component';

describe('WaitingPageComponent', () => {
  let component: WaitingPageComponent;
  let fixture: ComponentFixture<WaitingPageComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const apiServiceStub = () => ({
      previewApplication: applicationId => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WaitingPageComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WaitingPageComponent);
    component = fixture.componentInstance;

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`view has default value`, () => {
    expect(component.view).toEqual(false);
  });

  it(`message has default value`, () => {
    expect(component.message).toEqual(
      `Waiting for co-applicant to complete the application`
    );
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setTimeOut').and.callThrough();
      component.ngOnInit();
      expect(component.setTimeOut).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      localStorage.setItem('customerInitialData', JSON.stringify('{"id":210,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"40cf46bf356b5d27be6a6dce9c37ca09","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T18:23:28.535+00:00","canPreview":false,"relatedToCanPreview":false}'))
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(apiServiceStub, 'previewApplication').and.callThrough();
      component.refresh();
      // expect(routerStub.navigate).toHaveBeenCalled();
      expect(apiServiceStub.previewApplication).toHaveBeenCalled();
    });
  });
});
