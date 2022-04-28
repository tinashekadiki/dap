import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { FormDataService } from 'src/app/services/formdata/formdata.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormatDataService } from '../../services/format-data/format-data.service';
import { AlertService } from '../../services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { FinaldisclosureComponent } from './finaldisclosure.component';
import { ConsentData, ContactInformation, EmploymentInformation, FinancialInformation, PersonalInformation } from 'src/app/data/models/formdata.model';

describe('FinaldisclosureComponent', () => {
  let component: FinaldisclosureComponent;
  let fixture: ComponentFixture<FinaldisclosureComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const apiServiceStub = () => ({
      getIPAddress: () => ({ subscribe: f => f({}) }),
      postDisclosure: object => ({ subscribe: f => f({}) }),
      saveApplication: object => ({ subscribe: f => f({}) })
    });
    const formDataServiceStub = () => ({});
    const deviceDetectorServiceStub = () => ({ getDeviceInfo: () => ({}) });
    const formatDataServiceStub = () => ({
      undoCurrencyFormat: annualincome => ({})
    });
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FinaldisclosureComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: FormDataService, useFactory: formDataServiceStub },
        {
          provide: DeviceDetectorService,
          useFactory: deviceDetectorServiceStub
        },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FinaldisclosureComponent);
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

  it(`checkBox has default value`, () => {
    expect(component.checkBox).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      localStorage.setItem('customerAdditionInfo', JSON.stringify({"reposession":"Rent","mortgageamount":"$1,111,111,111","maritalstatus":"married","numberofdependents":12,"educationlevel":"Less than High School","residenttype":"citizen"}))
      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))
      localStorage.setItem('CustomerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      localStorage.setItem('placeLived', JSON.stringify({"yearsLived":0,"monthsLived":0}))
      localStorage.setItem('employmentInformation', JSON.stringify({"employmentstatus":"Self Employed/1099","employername":"James","jobtitle":"Software","workphonenumber":"(077) 244-0088","annualincome":"$120,000","startdate":"11/11/1111","additionalincome":"","previousemploymentstatus":"","previousemployername":"","previousjobtitle":"","previousworkphonenumber":"","previousannualincome":"","previousstartdate":"","previousenddate":"","enddate":"","incomesource":""}))

      component.customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
      component.employmentInformation = JSON.parse(localStorage.getItem('employmentInformation'));
      component.financialInformation = JSON.parse(localStorage.getItem('financialInformation'));
      component.customerAdditionaInfo = JSON.parse(localStorage.getItem('customerAdditionInfo'));
      component.credential = localStorage.getItem('credential');
      component.livedData = JSON.parse(localStorage.getItem('placeLived'));
      component.customerAdditionInfo = JSON.parse(localStorage.getItem('customerAdditionInfo'));


      component.consentData = new ConsentData();
      component.personalData = new PersonalInformation()
      component.contactData = new ContactInformation();

      component.contactData = JSON.parse(localStorage.getItem('customerDetails'));


      spyOn(component, 'getIP').and.callThrough();
      spyOn(component, 'getDeviceInformation').and.callThrough();
      spyOn(component, 'getCurrentTimeDate').and.callThrough();
      component.ngOnInit();
      expect(component.getIP).toHaveBeenCalled();
      expect(component.getDeviceInformation).toHaveBeenCalled();
      expect(component.getCurrentTimeDate).toHaveBeenCalled();
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
      component.consentData = new ConsentData();
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'getIPAddress').and.callThrough();
      component.getIP();
      expect(apiServiceStub.getIPAddress).toHaveBeenCalled();
    });
  });

  describe('submitDisclosure', () => {
    it('makes expected calls', () => {
      localStorage.setItem('customerAdditionInfo', JSON.stringify({"reposession":"Rent","mortgageamount":"$1,111,111,111","maritalstatus":"married","numberofdependents":12,"educationlevel":"Less than High School","residenttype":"citizen"}))
      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))
      localStorage.setItem('CustomerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      localStorage.setItem('placeLived', JSON.stringify({"yearsLived":0,"monthsLived":0}))
      localStorage.setItem('employmentInformation', JSON.stringify({"employmentstatus":"Self Employed/1099","employername":"James","jobtitle":"Software","workphonenumber":"(077) 244-0088","annualincome":"$120,000","startdate":"11/11/1111","additionalincome":"","previousemploymentstatus":"","previousemployername":"","previousjobtitle":"","previousworkphonenumber":"","previousannualincome":"","previousstartdate":"","previousenddate":"","enddate":"","incomesource":""}))
      localStorage.setItem('financialInformation', JSON.stringify({"workphonenumber":"","bankruptcy":"Yes","reposession":"No","lease":""}))

      component.consentData = new ConsentData();
      component.deviceInfo = {
        browser: "",
        os:""
      };
      component.deviceInfo.browser = "chrome"
      component.deviceInfo.os = "android"

      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))

      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'postDisclosure').and.callThrough();
      component.submitDisclosure();
      expect(apiServiceStub.postDisclosure).toHaveBeenCalled();
    });
  });

  describe('getCurrentTimeDate', () => {
    it('should getCurrentTimeDate', () => {
       expect(component.getCurrentTimeDate()).toBeTruthy();
    });
  });

  describe('finalPage', () => {
    it('makes expected calls', () => {
      component.checkBox = false;
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      const formatDataServiceStub: FormatDataService = fixture.debugElement.injector.get(
        FormatDataService
      );
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService

      );
      localStorage.setItem('customerAdditionInfo', JSON.stringify({"reposession":"Rent","mortgageamount":"$1,111,111,111","maritalstatus":"married","numberofdependents":12,"educationlevel":"Less than High School","residenttype":"citizen"}))
      localStorage.setItem('customerInitialData', JSON.stringify({"id":215,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"519641c7e4a75c1ecb8f2331ce522470","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T21:43:18.362+00:00","canPreview":false,"relatedToCanPreview":false}))
      localStorage.setItem('CustomerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      localStorage.setItem('placeLived', JSON.stringify({"yearsLived":0,"monthsLived":0}))

      component.consentData = new ConsentData();
      component.contactData = new ContactInformation();
      component.personalData = new PersonalInformation()
      component.customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
      component.employmentInformation = new EmploymentInformation();
      component.financialInformation = new FinancialInformation();
      component.customerAdditionaInfo = JSON.parse(localStorage.getItem('customerAdditionInfo'));
      component.credential = localStorage.getItem('credential');
      component.livedData = JSON.parse(localStorage.getItem('placeLived'));
      component.customerAdditionInfo = JSON.parse(localStorage.getItem('customerAdditionInfo'));


       spyOn(alertServiceStub, 'showError').and.callThrough();
      component.finalPage();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      // spyOn(component, 'submitDisclosure').and.callThrough();
      component.checkBox = true

      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(apiServiceStub, 'saveApplication').and.callThrough();
      spyOn(formatDataServiceStub, 'undoCurrencyFormat').and.callThrough();
      component.finalPage();
      // expect(component.submitDisclosure).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(apiServiceStub.saveApplication).toHaveBeenCalled();
      expect(formatDataServiceStub.undoCurrencyFormat).toHaveBeenCalled();




    });
  });
});
