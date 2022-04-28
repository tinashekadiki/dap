import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormDataService } from '../../services/formdata/formdata.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { PersonalinfoPageComponent } from './personalinfo-page.component';
import { Validators } from '@angular/forms';

describe('PersonalinfoPageComponent', () => {
  let component: PersonalinfoPageComponent;
  let fixture: ComponentFixture<PersonalinfoPageComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const titleStub = () => ({ setTitle: string => ({}) });
    const formDataServiceStub = () => ({ getPersonal: () => ({}) });
    const formatDataServiceStub = () => ({
      formatSsn: arg => ({}),
      formatDate: dateOfBirth => ({}),
      formatDateOnInput: date => ({})
    });
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PersonalinfoPageComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: Title, useFactory: titleStub },
        { provide: FormDataService, useFactory: formDataServiceStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PersonalinfoPageComponent);
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

  it(`isSSNValid has default value`, () => {
    expect(component.isSSNValid).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      localStorage.setItem('customerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      const formDataServiceStub: FormDataService = fixture.debugElement.injector.get(
        FormDataService
      );
      const formatDataServiceStub: FormatDataService = fixture.debugElement.injector.get(
        FormatDataService
      );
      spyOn(formatDataServiceStub, 'formatSsn').and.callThrough();
      spyOn(formatDataServiceStub, 'formatDate').and.callThrough();
      component.ngOnInit();
      expect(formatDataServiceStub.formatSsn).toHaveBeenCalled();
      expect(formatDataServiceStub.formatDate).toHaveBeenCalled();

      localStorage.removeItem('customerDetails')
      spyOn(formDataServiceStub, 'getPersonal').and.callThrough();
      component.ngOnInit();
      expect(formDataServiceStub.getPersonal).toHaveBeenCalled();

    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      component.personalData = new PersonalInformation()
      component.personalData.firstName = "John"
      component.personalData.lastName = " Doe"
      component.personalData.dateOfBirth = "190299"
      component.personalData.socialSecurityNumber = '123456789'
      localStorage.setItem('customerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      localStorage.setItem('personalInformation', JSON.stringify({}));

      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();

      component.personalData.firstName = ""
      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.onSubmit();
      expect(component.error).toEqual('Please fill all the fields')
      expect(alertServiceStub.showError).toHaveBeenCalled();

      component.errorSSN="The ssn you supplied does not match our records";
      component.personalData.firstName = "blessing";

      component.onSubmit();
      expect(component.error).toEqual('The ssn you supplied does not match our records')
      expect(alertServiceStub.showError).toHaveBeenCalled();

    });
  });
});
