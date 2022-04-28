import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApplicationData, CustomerData, Individual, Link } from 'src/app/data/models/formdata.model';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { log } from 'console';

@Component({
  selector: 'app-contactinfopage',
  templateUrl: './contactinfopage.component.html',
  styleUrls: ['./contactinfopage.component.css']
})
export class ContactinfopageComponent implements OnInit {

  linkData: Link;
  applicationData: ApplicationData;
  customerResidentalForm: FormGroup;
  loading = false;
  previousAddressState: boolean;
  submitLoad = false;
  verification: boolean;
  housingStatuses: [];
  submitted = false;
  customerData: CustomerData;
  payPhoneIndividualData: Individual;

  constructor(private router: Router,
    public formatDataService: FormatDataService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private notificationsService: AlertService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Digital Application Form - Residental');
    this.customerResidentalForm = new FormGroup({
      address: new FormControl('', Validators.required),
      apartmentUnit: new FormControl(''),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      housingStatus: new FormControl('', Validators.required),
      monthlyMortgage: new FormControl(),
      monthlyRent: new FormControl(),
      previousAddress: new FormControl(''),
      previousApartmentUnit: new FormControl(''),
      previousZip: new FormControl(''),
      previousState: new FormControl(''),
      previousCity: new FormControl(''),
      timeAtAddressYears: new FormControl('', Validators.required),
      timeAtAddressMonths: new FormControl(),
      timeAtPreviousAddressYears: new FormControl(),
      timeAtPreviousAddressMonths: new FormControl()
    });
  }

  ngOnInit(): void {
    this.verification = JSON.parse(sessionStorage.getItem('verification'))
    this.housingStatuses = JSON.parse(sessionStorage.getItem('housingStatuses'))
    this.customerData = JSON.parse(sessionStorage.getItem('customerData'))
    this.payPhoneIndividualData = this.apiService.retrievePayphoneIndiviualData();
    this.verification = this.payPhoneIndividualData ? true : false;
    this.linkData = JSON.parse(sessionStorage.getItem('link'));
    this.retrieveApplication();

    this.customerResidentalForm.valueChanges.subscribe(value => {
      this.formatDataService.removeCharcFromField('timePm');
      this.formatDataService.removeCharcFromField('timePrevM');
      if (value.timeAtAddressMonths > 11) {
        this.customerResidentalForm.patchValue({ timeAtAddressMonths: 11 });
      }
      if (value.timeAtAddressMonths < 0) {
        this.customerResidentalForm.patchValue({ timeAtAddressMonths: 0 });
      }
       if (value.timeAtPreviousAddressMonths > 11) {
        this.customerResidentalForm.patchValue({ timeAtPreviousAddressMonths: 11 });
      }
      if (value.timeAtPreviousAddressMonths < 0) {
        this.customerResidentalForm.patchValue({ timeAtPreviousAddressMonths: 0 });
      }
    });
  }

  submitForm() {
    this.submitLoad = true;
    this.submitted = true;
    if (this.customerResidentalForm.valid) {
      var dataToPost: any = {
        "applicationId": this.linkData.uniqueId,
        "firstName": this.applicationData.firstName,
        "middleName": this.applicationData.middleName,
        "lastName": this.applicationData.lastName,
        "birthday": this.applicationData.birthday,
        "ssn": this.applicationData.ssn,
        "email": this.applicationData.email,
        "confirmedEmailAddress": this.applicationData.confirmedEmailAddress,
        "phoneNumber": this.applicationData.phoneNumber,
        "address": this.customerResidentalForm.value.address,
        "city": this.customerResidentalForm.value.city,
        "state": this.customerResidentalForm.value.state,
        "zip": this.customerResidentalForm.value.zip,
        "employmentStatus": this.applicationData.employmentStatus,
        "employerName": this.applicationData.employerName,
        "jobTitle": this.applicationData.jobTitle,
        "workPhoneNumber": this.applicationData.workPhoneNumber,
        "annualIncome": this.applicationData.annualIncome,
        "startDate": this.applicationData.startDate ? this.applicationData.startDate : "",
        "additionalIncome": this.applicationData.additionalIncome,
        "additionalIncomeSource": this.applicationData.additionalIncomeSource,
        "bankruptcy": this.applicationData.bankruptcy,
        "reposession": this.applicationData.reposession,
        "lease": this.applicationData.lease,
        "reposessionDate": this.applicationData.reposessionDate,
        "bankruptcyDate": this.applicationData.bankruptcyDate,
        "driversLicenseNumber": this.applicationData.driversLicenseNumber,
        "ownership": this.applicationData.ownership,
        "monthlyRent": this.customerResidentalForm.value.monthlyRent,
        "monthlyMortgage": this.customerResidentalForm.value.monthlyMortgage,
        "maritalStatus": this.applicationData.maritalStatus,
        "numberOfDependents": this.applicationData.numberOfDependents,
        "educationLevel": this.applicationData.educationLevel,
        "previousZip": this.customerResidentalForm.value.previousZip,
        "previousAddress": this.customerResidentalForm.value.previousAddress,
        "previousState": this.customerResidentalForm.value.previousState,
        "previousCity": this.customerResidentalForm.value.previousCity,
        "timeAtAddressYears": this.customerResidentalForm.value.timeAtAddressYears,
        "timeAtAddressMonths": this.customerResidentalForm.value.timeAtAddressMonths,
        "timeAtPreviousAddressYears": this.customerResidentalForm.value.timeAtPreviousAddressYears,
        "timeAtPreviousAddressMonths": this.customerResidentalForm.value.timeAtPreviousAddressMonths,
        "apartmentUnit": this.customerResidentalForm.value.apartmentUnit,
        "previousApartmentUnit": this.customerResidentalForm.value.previousApartmentUnit,
        "previousEmployerName": this.applicationData.previousEmployerName,
        "previousJobTitle": this.applicationData.previousJobTitle,
        "previousPhoneNumber": this.applicationData.previousPhoneNumber,
        "previousAnnualIncome": this.applicationData.previousAnnualIncome,
        "previousEmploymentStartDate": this.applicationData.previousEmploymentStartDate ? this.applicationData.previousEmploymentStartDate : "",
        "previousEmploymentEndDate": this.applicationData.previousEmploymentEndDate ? this.applicationData.previousEmploymentEndDate : "",
        "title": this.applicationData.title,
        "relationship": this.applicationData.relationship,
        "suffix": this.applicationData.suffix,
        "prefix": this.applicationData.prefix,
        "driversLicenceState": this.applicationData.driversLicenceState,
        "housingStatus": this.customerResidentalForm.value.housingStatus,
        "preferredContactMethod": this.applicationData.preferredContactMethod,
        "preferredLanguage": this.applicationData.preferredLanguage,
        "otherPhoneNumber": this.applicationData.otherPhoneNumber,
        "eventId": this.applicationData.eventId,
      };

      this.apiService.saveApplicationData(dataToPost);
      this.submitLoad = false;
      this.router.navigateByUrl('employmentinfo');
    } else {
      this.submitLoad = false;
      this.notificationsService.showError('Please fill all the fields', '');
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.customerResidentalForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.customerResidentalForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  retrieveApplication() {
    this.applicationData = this.apiService.retrieveApplicationData();
    this.applicationData.previousAddress ? this.previousAddressState = true : this.previousAddressState = false;
    console.log(this.verification);

    if (this.verification) {
      console.log('this retrieve');
      console.log(this.payPhoneIndividualData);
      this.customerResidentalForm.patchValue({
        address: this.applicationData.address,
        city: this.applicationData.city,
        zip: this.applicationData.zip,
        state: this.applicationData.state,
        previousApartmentUnit: this.applicationData.previousApartmentUnit,
        apartmentUnit: this.applicationData.apartmentUnit,
        housingStatus: this.applicationData.housingStatus,
        monthlyMortgage: this.applicationData.monthlyMortgage,
        monthlyRent: this.applicationData.monthlyRent,
        previousAddress: this.applicationData.previousAddress,
        previousZip: this.applicationData.previousZip,
        previousState: this.applicationData.previousState,
        previousCity: this.applicationData.previousCity,
        timeAtAddressYears: this.applicationData.timeAtAddressYears > 0 ? this.applicationData.timeAtAddressYears : null,
        timeAtAddressMonths: this.applicationData.timeAtAddressMonths > 0 ? this.applicationData.timeAtAddressMonths : null,
        timeAtPreviousAddressYears: this.applicationData.timeAtPreviousAddressYears > 0 ?
          this.applicationData.timeAtPreviousAddressYears : null,
        timeAtPreviousAddressMonths: this.applicationData.timeAtPreviousAddressMonths > 0 ?
          this.applicationData.timeAtPreviousAddressMonths : null
      });
    } else {
      this.customerResidentalForm.patchValue({
        address: this.applicationData.address,
        city: this.applicationData.city,
        zip: this.applicationData.zip,
        state: this.applicationData.state,
        previousApartmentUnit: this.applicationData.previousApartmentUnit,
        apartmentUnit: this.applicationData.apartmentUnit,
        housingStatus: this.applicationData.housingStatus,
        monthlyMortgage: this.applicationData.monthlyMortgage,
        monthlyRent: this.applicationData.monthlyRent,
        previousAddress: this.applicationData.previousAddress,
        previousZip: this.applicationData.previousZip,
        previousState: this.applicationData.previousState,
        previousCity: this.applicationData.previousCity,
        timeAtAddressYears: this.applicationData.timeAtAddressYears > 0 ?
          this.applicationData.timeAtAddressYears : null,
        timeAtAddressMonths: this.applicationData.timeAtAddressMonths > 0 ?
          this.applicationData.timeAtAddressMonths : null,
        timeAtPreviousAddressYears: this.applicationData.timeAtPreviousAddressYears > 0 ?
          this.applicationData.timeAtPreviousAddressYears : null,
        timeAtPreviousAddressMonths: this.applicationData.timeAtPreviousAddressMonths > 0 ?
          this.applicationData.timeAtPreviousAddressMonths : null
      });
    }

  }


  toggleAddressState() {
    console.log('clicked');
    this.previousAddressState ? this.previousAddressState = false : this.previousAddressState = true
  }

  timeAtAddressYearsInput(value, field) {
    this.formatDataService.removeCharcFromField(field)
    value <= 2 ? this.previousAddressState = true : this.previousAddressState = false;
  }

  // updateMonths(value: number, field) {
  //   this.formatDataService.removeCharcFromField(field);
  //   console.log(value);
  //   if (value >= 12) {
  //     this.customerResidentalForm.patchValue({
  //       timeAtPreviousAddressMonths: 12
  //     });
  //   }
  // }
  //
  // updatePMonths(value: number, field) {
  //   this.formatDataService.removeCharcFromField(field);
  //   console.log(value);
  //   if (value >= 12) {
  //     this.customerResidentalForm.patchValue({
  //       timeAtPreviousAddressMonths: 12
  //     });
  //   }
  // }

  formatRentAmount(currency: string | number) {
    this.customerResidentalForm.patchValue({
      monthlyRent: this.formatDataService.formatCurrency(currency),
    });
  }

  formatMortageAmount(currency: string | number) {
    this.customerResidentalForm.patchValue({
      monthlyMortgage: this.formatDataService.formatCurrency(currency),
    });
  }

  get residentalForm(): any { return this.customerResidentalForm.controls; }
  get address() { return this.customerResidentalForm.get('address'); }
  get city() { return this.customerResidentalForm.get('city'); }
  get zip() { return this.customerResidentalForm.get('zip'); }
  get state() { return this.customerResidentalForm.get('state'); }
  get housingStatus() { return this.customerResidentalForm.get('housingStatus'); }
  get monthlyMortgage() { return this.customerResidentalForm.get('monthlyMortgage'); }
  get previousAddress() { return this.customerResidentalForm.get('previousAddress'); }
  get previousZip() { return this.customerResidentalForm.get('previousZip'); }
  get previousState() { return this.customerResidentalForm.get('previousState'); }
  get previousCity() { return this.customerResidentalForm.get('previousCity'); }
  get timeAtAddressYears() { return this.customerResidentalForm.get('timeAtAddressYears'); }
  get timeAtAddressMonths() { return this.customerResidentalForm.get('timeAtAddressMonths'); }
  get timeAtPreviousAddressYears() { return this.customerResidentalForm.get('timeAtPreviousAddressYears'); }
  get timeAtPreviousAddressMonths() { return this.customerResidentalForm.get('timeAtPreviousAddressMonths'); }
  get apartmentUnit() { return this.customerResidentalForm.get('apartmentUnit'); }

}
