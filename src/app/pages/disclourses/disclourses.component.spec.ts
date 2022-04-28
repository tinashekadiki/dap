import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { DiscloursesComponent } from './disclourses.component';

describe('DiscloursesComponent', () => {
  let component: DiscloursesComponent;
  let fixture: ComponentFixture<DiscloursesComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const apiServiceStub = () => ({
      postDisclosure: object => ({ subscribe: f => f({}) }),
      getIPAddress: () => ({ subscribe: f => f({}) })
    });
    const deviceDetectorServiceStub = () => ({ getDeviceInfo: () => ({}) });
    const alertServiceStub = () => ({ showError: (message, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DiscloursesComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub },
        {
          provide: DeviceDetectorService,
          useFactory: deviceDetectorServiceStub
        },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DiscloursesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`checkBox has default value`, () => {
    expect(component.checkBox).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getDeviceInformation').and.callThrough();
      spyOn(component, 'getIP').and.callThrough();
      component.ngOnInit();
      expect(component.getDeviceInformation).toHaveBeenCalled();
      expect(component.getIP).toHaveBeenCalled();
    });
  });


  describe('termsAgree', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );

      component.checkBox = false;
     
      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.termsAgree();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please agree to continue');
      component.deviceInfo = {
        browser: "",
        os:""
      }
      component.checkBox = true;
      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))

      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(apiServiceStub, 'postDisclosure').and.callThrough();
      component.termsAgree();
      component.ipAddress ="123456666";
      component.deviceInfo.browser = "chrome";
      component.deviceInfo.os = "android";
      
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(apiServiceStub.postDisclosure).toHaveBeenCalled();
    });
  });

  describe('getDeviceInformation', () => {
    it('makes expected calls', () => {
      const deviceDetectorServiceStub: DeviceDetectorService = fixture.debugElement.injector.get(
        DeviceDetectorService
      );
      spyOn(deviceDetectorServiceStub, 'getDeviceInfo').and.callThrough();
      component.getDeviceInformation();
      expect(deviceDetectorServiceStub.getDeviceInfo).toHaveBeenCalled();
    });
  });

  describe('getIP', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'getIPAddress').and.callThrough();
      component.getIP();
      expect(apiServiceStub.getIPAddress).toHaveBeenCalled();
    });
  });
});
