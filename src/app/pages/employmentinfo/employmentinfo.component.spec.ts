import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormDataService } from '../../services/formdata/formdata.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { EmploymentinfoComponent } from './employmentinfo.component';
import { EmploymentInformation } from 'src/app/data/models/formdata.model';

describe('EmploymentinfoComponent', () => {
  let component: EmploymentinfoComponent;
  let fixture: ComponentFixture<EmploymentinfoComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const titleStub = () => ({ setTitle: string => ({}) });
    const formDataServiceStub = () => ({ getEmploymentInfo: () => ({}) });
    const formatDataServiceStub = () => ({
      formatDateOnInput: date => ({}),
      formatPhoneNumberString: field => ({}),
      undoCurrencyFormat: arg => ({}),
      formatCurrency: amount => ({})
    });
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EmploymentinfoComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: Title, useFactory: titleStub },
        { provide: FormDataService, useFactory: formDataServiceStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(EmploymentinfoComponent);
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
      const formDataServiceStub: FormDataService = fixture.debugElement.injector.get(
        FormDataService
      );
      localStorage.setItem('employmentInformation', JSON.stringify({"employmentstatus":"Self Employed/1099","employername":"James","jobtitle":"Software","workphonenumber":"(077) 244-0088","annualincome":"$120,000","startdate":"11/11/1111","additionalincome":"","previousemploymentstatus":"","previousemployername":"","previousjobtitle":"","previousworkphonenumber":"","previousannualincome":"","previousstartdate":"","previousenddate":"","enddate":"","incomesource":""}))

      localStorage.setItem('attemptEmployment', 'true')

      component.ngOnInit();


      localStorage.setItem('attemptEmployment', 'false')
      spyOn(formDataServiceStub, 'getEmploymentInfo').and.callThrough();
      component.ngOnInit();
      expect(formDataServiceStub.getEmploymentInfo).toHaveBeenCalled();
    });
  });

  describe('toggle', () => {
    it('should toggle', () => {
      component.additionalincome = false;
      component.toggle();
      expect(component.additionalincome).toBeTrue()
      expect(component.buttonname).toEqual('-- Never mind, don’t add additional income')

      component.additionalincome= true;
      component.toggle();
      expect(component.additionalincome).toBeFalse();
      expect(component.buttonname).toEqual('+ Add another source of income')
    });
  });

  describe('togglePreviousEmployment', () => {
    it('should togglePreviousEmployment', () => {
      component.employment = false;
      component.togglePreviousEmployment();
      expect(component.employment).toBeTrue()
      expect(component.buttoname2).toEqual('-- Never mind, No Previous Employment')

      component.employment= true;
      component.togglePreviousEmployment();
      expect(component.employment).toBeFalse();
      expect(component.buttoname2).toEqual('+ Add Previous Employment')
    });
  });


  describe('filterChanged', () => {
    it('should filterChanged', () => {
      component.employentstatus = false;
      component.filterChanged('Self Employed/1099');
      expect(component.employentstatus).toBeTrue()
      component.filterChanged('Digital Form');
      expect(component.employentstatus).toBeTrue();
    });
  });

  describe('formatPreviousCurrency', () => {
    it('should formatPreviousCurrency', () => {
      component.employmentInformation = new EmploymentInformation();
      component.employmentInformation.previousannualincome = "12000";
      const formatDataService: FormatDataService = fixture.debugElement.injector.get(
        FormatDataService
      );
      spyOn(component, 'setPreviousWeeklyIncome').and.callThrough();
      spyOn(component, 'setPreviousMonthlyIncome').and.callThrough();

      spyOn(formatDataService, 'formatCurrency').and.callThrough();
      component.formatPreviousCurrency('22002');

      expect(formatDataService.formatCurrency).toHaveBeenCalled();
      expect(component.setPreviousMonthlyIncome).toHaveBeenCalled();
      expect(component.setPreviousWeeklyIncome).toHaveBeenCalled();
    });
  });

  describe('formatCurrency', () => {
    it('should formatCurrency', () => {
      component.employmentInformation = new EmploymentInformation();
      component.employmentInformation.annualincome = "12000";
      const formatDataService: FormatDataService = fixture.debugElement.injector.get(
        FormatDataService
      );
      spyOn(component, 'setWeeklyIncome').and.callThrough()
      spyOn(component, 'setMonthlyIncome').and.callThrough()

      spyOn(formatDataService, 'formatCurrency').and.callThrough();

      component.formatCurrency('1202002');

      expect(formatDataService.formatCurrency).toHaveBeenCalled();
      expect(component.setWeeklyIncome).toHaveBeenCalled();
      expect(component.setMonthlyIncome).toHaveBeenCalled();

    });
  });

  describe('formatAdditionalCurrency', () => {
    it('should formatAdditionalCurrency', () => {
      component.employmentInformation = new EmploymentInformation();
      component.employmentInformation.additionalincome = "12000";
      const formatDataService: FormatDataService = fixture.debugElement.injector.get(
        FormatDataService
      );
      spyOn(component, 'setAdditionalWeeklyIncome').and.callThrough()
      spyOn(component, 'setAdditionalMonthlyIncome').and.callThrough()

      spyOn(formatDataService, 'formatCurrency').and.callThrough();

      component.formatAdditionalCurrency('1202002');

      expect(formatDataService.formatCurrency).toHaveBeenCalled();
      expect(component.setAdditionalMonthlyIncome).toHaveBeenCalled();
      expect(component.setAdditionalMonthlyIncome).toHaveBeenCalled();

    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      component.employentstatus = true;
      component.employmentInformation = new EmploymentInformation()
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields')


      component.employmentInformation.employmentstatus= "employed"
      component.employmentInformation.employername=" james"
      component.employmentInformation.jobtitle ="software"
      component.employmentInformation.workphonenumber="0772440088"
      component.employmentInformation.annualincome= "120000"
      component.employmentInformation.startdate ="12001111"

      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();

      component.employentstatus = false

      component.employmentInformation.employmentstatus= ""

      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields')


      component.employmentInformation.employmentstatus= "employed"

      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields')

    });
  });
});
