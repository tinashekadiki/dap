import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormsModule } from '@angular/forms';
import { AdditionalpersonalComponent } from './additionalpersonal.component';

describe('AdditionalpersonalComponent', () => {
  let component: AdditionalpersonalComponent;
  let fixture: ComponentFixture<AdditionalpersonalComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const formatDataServiceStub = () => ({ formatCurrency: currency => ({}) });
    const alertServiceStub = () => ({ showError: (error, string) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdditionalpersonalComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormatDataService, useFactory: formatDataServiceStub },
        { provide: AlertService, useFactory: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AdditionalpersonalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      
      component.reposession  = "yes";
      component.mortgageamount  = "1200";
      component.maritalstatus  ="single";
      component.educationlevel  = "highschool";
      component.residenttype ="permanent";

      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );

      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
       
      component.reposession = '';


      spyOn(alertServiceStub, 'showError').and.callThrough();
      component.onSubmit();
      expect(alertServiceStub.showError).toHaveBeenCalled();
      expect(component.error).toEqual('Please fill all the fields');
    });
  });

  describe('formatCurrency', () => {
    it('should formatCurrency', () => {
      
      const formatDataService : FormatDataService = fixture.debugElement.injector.get(FormatDataService);
      component.mortgageamount  = "1200";

      spyOn(formatDataService, 'formatCurrency').and.callThrough();
      component.formatCurrency('12000');
      expect(formatDataService.formatCurrency).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('make expected calls', () => {
      component.reposession  = "";
      component.mortgageamount  = "";
      component.maritalstatus  ="";
      component.educationlevel  = "";
      component.residenttype ="";

      localStorage.setItem('customerAdditionInfo', JSON.stringify({"reposession":"Rent","mortgageamount":"$1,111,111,111","maritalstatus":"married","numberofdependents":12,"educationlevel":"Less than High School","residenttype":"citizen"}))
    
      component.ngOnInit();
    });
  });
});
