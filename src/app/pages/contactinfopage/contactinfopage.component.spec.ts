import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/formdata/formdata.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { ContactinfopageComponent } from './contactinfopage.component';
import { ContactInformation } from 'src/app/data/models/formdata.model';

describe('ContactinfopageComponent', () => {
  let component: ContactinfopageComponent;
  let fixture: ComponentFixture<ContactinfopageComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const formDataServiceStub = () => ({ getContactInfo: () => ({}) });
    const formatDataServiceStub = () => ({
      formatPhoneNumberString: cellPhone => ({})
    });
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContactinfopageComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormDataService, useFactory: formDataServiceStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ContactinfopageComponent);
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

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      localStorage.setItem('customerDetails', JSON.stringify({"CustomerData":{"relationType":null,"processes":[{"processId":20}],"CoBorrower":null,"CustomerPreviousContactDetails":[],"CustomerContactDetails":{"id":75,"customerId":44,"emailSecondary":null,"cellPhone":null,"city":"ATWOOD","country":"USA","emailPreffered":null,"emailPrimary":null,"emailWork":null,"homePhone":null,"mailingCity":"ATWOOD","mailingJurisdictionCode":"CA","mailingMsa":null,"mailingMsaCode":null,"mailingPostalCode":"92807","mailingState":null,"mailingStreetAddress1":"135 STONEWALL LN","mailingStreetAddress2":null,"msa":null,"msaCode":null,"postalCode":"92807","rentOwn":null,"resType":null,"state":"CA","streetName":null,"streetNumber":null,"timeAtPresentAddressMnths":null,"timeAtPresentAddressYrs":null,"unitOrAppt":null},"CustomerBiometricDetail":{"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","sex":"Male","eyeColor":"GRN","hairColor":"BLK","heightInCM":null,"height_in_FT_IN":null,"weight_in_KG":null,"weight_in_LBS":null},"ComplianceFlag":"Blocked","CustomerPersonalDetails":{"id":44,"customerGlobalId":"YRI92807JANED15CAM3991AX195068GRN","createdAt":"2021-04-15T16:12:33.759+00:00","dateOfBirth":"01/15/1993","educLevel":"","familyName":"INQUIRY","firstName":"EDWARD","givenName":"EDWARD","lastName":"INQUIRY","licenseExpirationDate":"2022-12-04T00:00:00.000+00:00","licenseIdNumber":"AX19588","licenseState":"","middleInitial":"N","middleName":"","namePrefix":"N","nameSuffix":"","nonResidentIndicator":"","privacyIndicator":"","privacyType":"","socialSecurityNumber":"000-27-7697","socialSecurityNumberFraud1":null,"socialSecurityNumberFraud2":null,"socialSecurityNumberFraud3":null,"status":null,"statusDescription":null,"eyeColor":"GRN","hairColor":"BLK","heightInCm":"","heightInFtIn":"068 IN","sex":"Male","weightInKg":null,"weightInLbs":"140"},"EventCode":"1234024442021-05-06 19:11:10"}}))
      localStorage.setItem('contactInformation', JSON.stringify({}));

      localStorage.setItem('placeLived', JSON.stringify({"yearsLived":0,"monthsLived":0}));
      component.previousAddressState = false;
      component.buttonName =" buttone1"
      component.contactData =new ContactInformation();


      component.contactData.cellPhone ="0772440088";
      const formDataServiceStub: FormDataService = fixture.debugElement.injector.get(
        FormDataService
      );

      component.ngOnInit();
      // expect(formatDataServiceStub.formatPhoneNumberString).toHaveBeenCalled();/

      localStorage.removeItem('contactInformation');

      spyOn(formDataServiceStub, 'getContactInfo').and.callThrough();
      component.ngOnInit();
      expect(formDataServiceStub.getContactInfo).toHaveBeenCalled();


      expect(component.previousAddressState).toBeFalse()
      expect(component.buttonName).toEqual('+ Previous Address')

    });
  });

  describe('previousAddress', () => {
    it('should toggle previousAddress', () => {
      component.previousAddressState = false;
      component.previousAddress();

      expect(component.previousAddressState).toBeTrue();
      expect(component.buttonName).toEqual('-- No Previous Address')

      component.previousAddressState = true;
      component.previousAddress();
      expect(component.previousAddressState).toBeFalse();
      expect(component.buttonName).toEqual('+ Previous Address')
    });
  });

  describe('isEmailValid', () => {
    it('isEmailValid', () => {
      component.contactData = new ContactInformation();
      component.contactData.emailPrimary = "james@qubedlab.com" ;
      component.cemail = "james@qubedlab.com"

      expect(component.isEmailValid()).toBeTrue();
    });
  });

  describe('updateMonths', () => {
    it('should updateMonths', () => {
       component.updateMonths(12);

       expect(component.monthsLived).toEqual(0)
      //  expect(component.yearsLived).toEqual(1)
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      component.previousAddressState = true;
      component.contactData = new ContactInformation();
      component.contactData.emailPrimary = "james@qubedlab.com" ;
      component.cemail = "james@qubedlab.com" ;
      component.contactData.cellPhone = "0772440088" ;
      component.contactData.mailingStreetAddress1 =  "New York";
      component.contactData.city =  "New";
      component.contactData.postalCode =  "0000";
      component.contactData.state =  "York";
      component.contactData.previousaddress = "New York" ;
      component.contactData.previousCity = "New York" ;
      component.contactData.previousstate = "York" ;
      component.contactData.previouszip = "0000";

      localStorage.setItem('placeLived', JSON.stringify({"yearsLived":0,"monthsLived":0}));
      localStorage.setItem('contactInformation', JSON.stringify({
        "id":75,
        "customerId":44,
        "emailSecondary":null,
        "cellPhone":null,
        "city":"ATWOOD",
        "country":"USA",
        "emailPreffered":null,
        "emailPrimary":null,
        "emailWork":null,
        "homePhone":null,
        "mailingCity":"ATWOOD",
        "mailingJurisdictionCode":"CA",
        "mailingMsa":null,
        "mailingMsaCode":null,
        "mailingPostalCode":"92807",
        "mailingState":null,
        "mailingStreetAddress1":"135 STONEWALL LN",
        "mailingStreetAddress2":null,
        "msa":null,
        "msaCode":null,
        "postalCode":"92807",
        "rentOwn":null,
        "resType":null,
        "state":"CA",
        "streetName":null,
        "streetNumber":null,
        "timeAtPresentAddressMnths":null,
        "timeAtPresentAddressYrs":null,
        "unitOrAppt":null
     }))
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();

      localStorage.removeItem('contactInformation');
      component.onSubmit()
      expect(routerStub.navigate).toHaveBeenCalled();

      localStorage.setItem('contactInformation', JSON.stringify({
        "id":75,
        "customerId":44,
        "emailSecondary":null,
        "cellPhone":null,
        "city":"ATWOOD",
        "country":"USA",
        "emailPreffered":null,
        "emailPrimary":null,
        "emailWork":null,
        "homePhone":null,
        "mailingCity":"ATWOOD",
        "mailingJurisdictionCode":"CA",
        "mailingMsa":null,
        "mailingMsaCode":null,
        "mailingPostalCode":"92807",
        "mailingState":null,
        "mailingStreetAddress1":"135 STONEWALL LN",
        "mailingStreetAddress2":null,
        "msa":null,
        "msaCode":null,
        "postalCode":"92807",
        "rentOwn":null,
        "resType":null,
        "state":"CA",
        "streetName":null,
        "streetNumber":null,
        "timeAtPresentAddressMnths":null,
        "timeAtPresentAddressYrs":null,
        "unitOrAppt":null
     }))

      component.contactData.emailPrimary = "";
      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields');



      component.previousAddressState = false;

      component.contactData.emailPrimary ="james@qubedlab.com";
      component.cemail ="james@qubedlab.com";
      component.contactData.cellPhone ="0772440088";
      component.contactData.mailingStreetAddress1 ="New York";
      component.contactData.city ="York";
      component.contactData.postalCode ="0000";
      component.contactData.state ="York";
      component.onSubmit();

      expect(routerStub.navigate).toHaveBeenCalled();

      localStorage.removeItem('contactInformation');
      component.onSubmit();

      component.contactData.emailPrimary = "";
      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields');
    });
  });
});
