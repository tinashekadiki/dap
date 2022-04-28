import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { WelcomepageComponent } from './welcomepage.component';
import { PlaceLivedData } from 'src/app/data/models/formdata.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('WelcomepageComponent', () => {
  let component: WelcomepageComponent;
  let fixture: ComponentFixture<WelcomepageComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const apiServiceStub = () => ({
      checkLinkValid: id => ({ subscribe: f => f({}) }),
      getDealerSmsData: (id, object) => ({ subscribe: f => f({}) }),
      postCustomerRecords: (bodyData, token) => ({ subscribe: f => f({}) })
    });
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigateByUrl: string => ({}) });
    const alertServiceStub = () => ({ showError: (message, string) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WelcomepageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WelcomepageComponent);
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

  it(`image has default value`, () => {
    expect(component.image).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(true);
  });


  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'checkLinkValid').and.callThrough();
      component.ngOnInit();
      expect(component.checkLinkValid).toHaveBeenCalled();
      expect(component.customer).toBeTruthy
    });
  });

  describe('initialiseComponent', () => {
    it('should initialise component', () => {
      localStorage.setItem('customerInitialData', JSON.stringify({"id":208,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"6c1cbac81918b78f44a42d408c41ee6f","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T17:03:03.155+00:00","canPreview":false,"relatedToCanPreview":false}))
      component.customerInitialData = JSON.parse(localStorage.getItem('customerInitialData'))
      localStorage.setItem('placeLived', JSON.stringify(new PlaceLivedData()));
      localStorage.setItem('customerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":"(077) 244-0088","city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":"james@qubedlab.com","emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 11:41:21"}}))

      const apiServiceStub: ApiService = fixture.debugElement.injector.get(ApiService);
      // const alertService: AlertService = fixture.debugElement.injector.get(AlertService);
      spyOn(apiServiceStub, 'getDealerSmsData').and.callThrough();
      spyOn(component, 'submitInfo').and.callThrough();
      // spyOn(alertService, 'showError')
      component.initialiseComponent("6c1cbac81918b78f44a42d408c41ee6f");
      expect(apiServiceStub.getDealerSmsData).toHaveBeenCalled();
      // expect(component.submitInfo).toHaveBeenCalled()
    });
  });


  describe('submitInfo', () => {
    it('should submit info', () => {
      localStorage.setItem('customerInitialData', JSON.stringify({"id":208,"firstName":null,"middleName":null,"lastName":null,"birthday":null,"ssn":null,"email":null,"confirmedEmailAddress":null,"phoneNumber":null,"address":null,"city":null,"state":null,"zip":null,"employmentStatus":null,"employerName":null,"jobTitle":null,"workPhoneNumber":null,"annualIncome":0,"startDate":null,"additionalIncome":0,"bankruptcy":null,"reposession":null,"lease":null,"relation":"borrower","relatedTo":"","equifax":"Y","transunion":"Y","experian":"N","globalCustomerId":"YRI92807JANED15CAM3991AX195068GRN","requestType":"individual","transactionId":null,"branchId":"234024","parentId":"1","driversLicenseNumber":null,"ownership":null,"monthlyRent":0,"monthlyMortgage":0,"maritalStatus":null,"numberOfDependents":0,"educationLevel":null,"previousZip":null,"previousAddress":null,"previousState":null,"timeAtAddressYears":0,"timeAtAddressMonths":0,"previousEmployerName":null,"previousJobTitle":null,"previousPhoneNumber":null,"previousAnnualIncome":0,"previousEmploymentStartDate":null,"previousEmploymentEndDate":null,"blc_TransactionId":null,"eventId":null,"completed":false,"applicationId":"6c1cbac81918b78f44a42d408c41ee6f","relatedToCompleted":false,"title":null,"relationship":null,"suffix":null,"prefix":null,"driversLicenceState":null,"housingStatus":null,"preferredContactMethod":null,"preferredLanguage":null,"otherPhoneNumber":null,"createdAt":"2021-05-06T17:03:03.155+00:00","canPreview":false,"relatedToCanPreview":false}))
      component.customerInitialData = JSON.parse(localStorage.getItem('customerInitialData'))
      localStorage.setItem('placeLived', JSON.stringify(new PlaceLivedData()));
      localStorage.setItem('customerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":"(077) 244-0088","city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":"james@qubedlab.com","emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 11:41:21"}}))

      const apiServiceStub: ApiService = fixture.debugElement.injector.get(ApiService);
      // const alertService: AlertService = fixture.debugElement.injector.get(AlertService);
      spyOn(apiServiceStub, 'postCustomerRecords').and.callThrough();
      spyOn(component, 'submitInfo').and.callThrough();
      // spyOn(alertService, 'showError')
      component.submitInfo("YRI92807JANED15CAM3991AX195068GRN","");
      expect(apiServiceStub.postCustomerRecords).toHaveBeenCalled();
      // expect(component.submitInfo).toHaveBeenCalled()
    });
  });


  describe('checkLinkValid', () => {
    it('should checkLinkValid', () => {

      const apiServiceStub: ApiService = fixture.debugElement.injector.get(ApiService);
      spyOn(apiServiceStub, 'checkLinkValid').and.callThrough();
      spyOn(component, 'submitInfo').and.callThrough();

      component.checkLinkValid("6c1cbac81918b78f44a42d408c41ee6f");
      expect(apiServiceStub.checkLinkValid).toHaveBeenCalled();
    });
  });
});
