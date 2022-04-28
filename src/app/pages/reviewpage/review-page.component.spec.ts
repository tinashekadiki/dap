import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { FormDataService } from '../../services/formdata/formdata.service';
import { FormsModule } from '@angular/forms';
import { ReviewPageComponent } from './review-page.component';
import { ContactInformation, PersonalInformation } from 'src/app/data/models/formdata.model';

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const formatDataServiceStub = () => ({});
    const formDataServiceStub = () => ({});
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
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReviewPageComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: Router, useFactory: routerStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: FormDataService, useFactory: formDataServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;

    let store = {};

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
      localStorage.setItem('contactInformation', JSON.stringify({}));
      localStorage.setItem('personalInformation', JSON.stringify({}));
      localStorage.setItem('employmentInformation', JSON.stringify({}));
      localStorage.setItem('financialInformation', JSON.stringify({}));
      localStorage.setItem('customerAdditionInfo', JSON.stringify({}));

      component.personalData = new PersonalInformation();
      component.contactData = new ContactInformation();

      component.ngOnInit();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      localStorage.setItem('CustomerDetails', JSON.stringify({ "CustomerData": { "relationType": null, "processes": [{ "processId": 20 }], "CoBorrower": null, "CustomerPreviousContactDetails": [], "CustomerContactDetails": { "id": 75, "customerId": 44, "emailSecondary": null, "cellPhone": null, "city": "ATWOOD", "country": "USA", "emailPreffered": null, "emailPrimary": null, "emailWork": null, "homePhone": null, "mailingCity": "ATWOOD", "mailingJurisdictionCode": "CA", "mailingMsa": null, "mailingMsaCode": null, "mailingPostalCode": "92807", "mailingState": null, "mailingStreetAddress1": "135 STONEWALL LN", "mailingStreetAddress2": null, "msa": null, "msaCode": null, "postalCode": "92807", "rentOwn": null, "resType": null, "state": "CA", "streetName": null, "streetNumber": null, "timeAtPresentAddressMnths": null, "timeAtPresentAddressYrs": null, "unitOrAppt": null }, "CustomerBiometricDetail": { "customerGlobalId": "YRI92807JANED15CAM3991AX195068GRN", "sex": "Male", "eyeColor": "GRN", "hairColor": "BLK", "heightInCM": null, "height_in_FT_IN": null, "weight_in_KG": null, "weight_in_LBS": null }, "ComplianceFlag": "Blocked", "CustomerPersonalDetails": { "id": 44, "customerGlobalId": "YRI92807JANED15CAM3991AX195068GRN", "createdAt": "2021-04-15T16:12:33.759+00:00", "dateOfBirth": "01/15/1993", "educLevel": "", "familyName": "INQUIRY", "firstName": "EDWARD", "givenName": "EDWARD", "lastName": "INQUIRY", "licenseExpirationDate": "2022-12-04T00:00:00.000+00:00", "licenseIdNumber": "AX19588", "licenseState": "", "middleInitial": "N", "middleName": "", "namePrefix": "N", "nameSuffix": "", "nonResidentIndicator": "", "privacyIndicator": "", "privacyType": "", "socialSecurityNumber": "000-27-7697", "socialSecurityNumberFraud1": null, "socialSecurityNumberFraud2": null, "socialSecurityNumberFraud3": null, "status": null, "statusDescription": null, "eyeColor": "GRN", "hairColor": "BLK", "heightInCm": "", "heightInFtIn": "068 IN", "sex": "Male", "weightInKg": null, "weightInLbs": "140" }, "EventCode": "1234024442021-05-06 19:11:10" } }))
      component.personalData = new PersonalInformation();
      component.contactData = new ContactInformation();

      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
