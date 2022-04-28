import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormDataService } from '../../services/formdata/formdata.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { FinancialInfoComponent } from './financial-info.component';
import { FinancialInformation } from 'src/app/data/models/formdata.model';

describe('FinancialInfoComponent', () => {
  let component: FinancialInfoComponent;
  let fixture: ComponentFixture<FinancialInfoComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const titleStub = () => ({ setTitle: string => ({}) });
    const formDataServiceStub = () => ({ getFinacialInfo: () => ({}) });
    const apiServiceStub = () => ({
      postApplicationComplete: applicationId => ({ subscribe: f => f({}) }),
      previewApplication: applicationId => ({ subscribe: f => f({}) })
    });
    const formatDataServiceStub = () => ({});
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FinancialInfoComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: Title, useFactory: titleStub },
        { provide: FormDataService, useFactory: formDataServiceStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FinancialInfoComponent);
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

  it('can postApplicationComplete', () => {
    const apiServiceStub: ApiService = fixture.debugElement.injector.get(
      ApiService
    );
    spyOn(apiServiceStub, 'postApplicationComplete').and.callThrough();
    spyOn(apiServiceStub, 'previewApplication').and.callThrough()


    component.postApplicationComplete('519641c7e4a75c1ecb8f2331ce522470');
    expect(apiServiceStub.postApplicationComplete).toHaveBeenCalled();
    expect(apiServiceStub.previewApplication).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      localStorage.setItem('attemptFinancial', "true")
      localStorage.setItem('financialInformation', JSON.stringify({"workphonenumber":"","bankruptcy":"Yes","reposession":"No","lease":""}))
      const formDataServiceStub: FormDataService = fixture.debugElement.injector.get(
        FormDataService
      );
      spyOn(formDataServiceStub, 'getFinacialInfo').and.callThrough();
      component.ngOnInit();
      expect(formDataServiceStub.getFinacialInfo).toHaveBeenCalled();

      localStorage.setItem('attemptFinancial', "false")
      component.ngOnInit();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      component.financialInformation = new FinancialInformation()
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields');

      component.financialInformation.bankruptcy ="yes";
       component.financialInformation.reposession ="no";

      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))
      spyOn(component, 'postApplicationComplete').and.callThrough();
      component.onSubmit();
      expect(component.postApplicationComplete).toHaveBeenCalled();
    });
  });
});
