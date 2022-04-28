import { Link, Individual } from './../../data/models/formdata.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { Title } from '@angular/platform-browser';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationData, CustomerInteractionInitialData } from 'src/app/data/models/formdata.model';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employmentinfo',
  templateUrl: './employmentinfo.component.html',
  styleUrls: ['./employmentinfo.component.css']
})
export class EmploymentinfoComponent implements OnInit {

  error: string;
  linkData: Link;
  applicationData: ApplicationData;
  customerEmployementForm: FormGroup;
  loading = false;
  submitLoad = false;
  submitted = false;
  previuosEmployementStatus: boolean;
  previuosEmployementStatusLessTwoYears = false;
  additionalIncomeStatus: boolean;
  hasEmployement = true;
  employementStatuses: [];
  additionalIncomeSources: []
  currentWeekSalary: string;
  currentMonthlySalary: string;

  prevWeekSalary: string;
  prevMonthlySalary: string;

  addWeekSalary: string;
  addMonthlySalary: string;

  isSDateValidFo = true;
  sMonthsError = "";
  sDaysError = "";
  sYearsError = "";
  isSDateInfuture = false;

  isPrevStDateValidFor = true;
  prevStMonthsError = "";
  prevStDaysError = "";
  prevStYearsError = "";
  prevStIsDateInfure = false;

  isPrevEnDateValidFor = true;
  prevEnMonthsError = "";
  prevEnDaysError = "";
  prevEnYearsError = "";
  prevEnIsDateInfure = false;


  constructor(
    private router: Router,
    private titleService: Title,
    public formatDataService: FormatDataService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private notificationsService: AlertService) {
    this.titleService.setTitle('Digital Application Form - Employement & Income');

  }

  ngOnInit(): void {
    this.employementStatuses = JSON.parse(sessionStorage.getItem('employementStatuses'))
    this.additionalIncomeSources = JSON.parse(sessionStorage.getItem('additionalIncomeSources'))
    this.customerEmployementForm = this.fb.group({
      employmentStatus: ["", Validators.required],
      employerName: [""],
      jobTitle: [""],
      workPhoneNumber: [""],
      annualIncome: [""],
      startDate: [""],
      previousEmployerName: [""],
      previousJobTitle: [""],
      previousPhoneNumber: [""],
      previousAnnualIncome: [""],
      previousEmploymentStartDate: [""],
      previousEmploymentEndDate: [""],
      additionalIncomeSource: [""],
      additionalIncome: [null]
    })
    this.linkData = JSON.parse(sessionStorage.getItem('link'))
    this.retrieveApplication()
    this.calcCurrentWeeklyMonthlySalary()
    this.calcAddWeeklyMonthlySalary()
    this.calcPrevWeeklyMonthlySalary()
  }

  submitForm() {
    this.submitLoad = true;
    this.submitted = true;
    if (this.customerEmployementForm.valid && this.isSDateValidFo && this.isPrevStDateValidFor && this.isPrevEnDateValidFor) {
      const dataToPost: any = {
        "applicationId": this.linkData.uniqueId,
        "firstName": this.applicationData.firstName,
        "middleName": this.applicationData.middleName,
        "lastName": this.applicationData.lastName,
        "birthday": this.applicationData.birthday,
        "ssn": this.applicationData.ssn,
        "email": this.applicationData.email,
        "confirmedEmailAddress": this.applicationData.confirmedEmailAddress,
        "phoneNumber": this.applicationData.phoneNumber,
        "address": this.applicationData.address,
        "city": this.applicationData.city,
        "state": this.applicationData.state,
        "zip": this.applicationData.zip,
        "employmentStatus": this.customerEmployementForm.value.employmentStatus,
        "employerName": this.customerEmployementForm.value.employerName,
        "jobTitle": this.customerEmployementForm.value.jobTitle,
        "workPhoneNumber": this.customerEmployementForm.value.workPhoneNumber,
        "annualIncome": this.customerEmployementForm.value.annualIncome,
        "startDate": this.customerEmployementForm.value.startDate,
        "additionalIncome": this.customerEmployementForm.value.additionalIncome,
        "additionalIncomeSource": this.customerEmployementForm.value.additionalIncomeSource,
        "bankruptcy": this.applicationData.bankruptcy,
        "reposession": this.applicationData.reposession,
        "lease": this.applicationData.lease,
        "driversLicenseNumber": this.applicationData.driversLicenseNumber,
        "ownership": this.applicationData.ownership,
        "monthlyRent": this.applicationData.monthlyRent,
        "monthlyMortgage": this.applicationData.monthlyMortgage,
        "maritalStatus": this.applicationData.maritalStatus,
        "numberOfDependents": this.applicationData.numberOfDependents,
        "educationLevel": this.applicationData.educationLevel,
        "previousZip": this.applicationData.previousZip,
        "previousAddress": this.applicationData.previousAddress,
        "previousState": this.applicationData.previousState,
        "previousCity": this.applicationData.previousCity,
        "previousApartmentUnit": this.applicationData.previousApartmentUnit,
        "apartmentUnit": this.applicationData.apartmentUnit,
        "timeAtAddressYears": this.applicationData.timeAtAddressYears,
        "timeAtAddressMonths": this.applicationData.timeAtAddressMonths,
        "previousEmployerName": this.customerEmployementForm.value.previousEmployerName,
        "previousJobTitle": this.customerEmployementForm.value.previousJobTitle,
        "previousPhoneNumber": this.customerEmployementForm.value.previousPhoneNumber,
        "previousAnnualIncome": this.customerEmployementForm.value.previousAnnualIncome > 0 ? this.customerEmployementForm.value.previousAnnualIncome : null,
        "previousEmploymentStartDate": this.customerEmployementForm.value.previousEmploymentStartDate ? this.customerEmployementForm.value.previousEmploymentStartDate : "",
        "previousEmploymentEndDate": this.customerEmployementForm.value.previousEmploymentEndDate ? this.customerEmployementForm.value.previousEmploymentEndDate : "",
        "title": this.applicationData.title,
        "relationship": this.applicationData.relationship,
        "suffix": this.applicationData.suffix,
        "prefix": this.applicationData.prefix,
        "driversLicenceState": this.applicationData.driversLicenceState,
        "housingStatus": this.applicationData.housingStatus,
        "preferredContactMethod": this.applicationData.preferredContactMethod,
        "preferredLanguage": "english",
        "otherPhoneNumber": this.applicationData.otherPhoneNumber,
        "eventId": this.applicationData.eventId,
        "timeAtPreviousAddressYears": this.applicationData.timeAtPreviousAddressYears,
        "timeAtPreviousAddressMonths": this.applicationData.timeAtPreviousAddressMonths,
        "reposessionDate": this.applicationData.reposessionDate,
        "bankruptcyDate": this.applicationData.bankruptcyDate
      }
      this.apiService.saveApplicationData(dataToPost);
      this.submitLoad = false;
      this.router.navigateByUrl('finacialinfo');
    } else {
      this.submitLoad = false;
      this.notificationsService.showError('Please check your fields and try again', '')
    }
  }

  togglePreviuosEmployementStatus() {
    console.log('clicked');
    this.previuosEmployementStatus ? this.previuosEmployementStatus = false : this.previuosEmployementStatus = true
  }

  toggleAdditionalIncomeStatus() {
    console.log('clicked');
    this.additionalIncomeStatus ? this.additionalIncomeStatus = false : this.additionalIncomeStatus = true
  }

  formatAnnualIncome() {
    // this.customerEmployementForm.patchValue({
    //   annualIncome: this.formatDataService.formatCurrency(currency),
    // });
    console.log('formatted');

    this.formatDataService.removeCharcFromField('annulaIncome')
    this.calcCurrentWeeklyMonthlySalary()
  }

  formatPreviousAnnualIncome() {
    // this.customerEmployementForm.patchValue({
    //   previousAnnualIncome: this.formatDataService.formatCurrency(currency),
    // });
    this.formatDataService.removeCharcFromField('annulaIncomePrev')
    this.calcPrevWeeklyMonthlySalary()
  }


  formatAdditionalAnnualIncome() {
    // this.customerEmployementForm.patchValue({
    //   additionalIncome: this.formatDataService.formatCurrency(currency),
    // });
    this.formatDataService.removeCharcFromField('annulaIncomeAd')
    this.calcAddWeeklyMonthlySalary()
  }

  getYearsDiff(value) {
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') <= 2 ? this.previuosEmployementStatusLessTwoYears = true : this.previuosEmployementStatusLessTwoYears = false;

    }
    this.isSDateValid(value);
    // console.log(moment().diff(new Date(value)));
  }


  retrieveApplication() {
    this.applicationData = this.apiService.retrieveApplicationData();
    this.applicationData.previousEmployerName ? this.previuosEmployementStatus = true : this.previuosEmployementStatus = false;
    this.applicationData.additionalIncomeSource ? this.additionalIncomeStatus = true : this.additionalIncomeStatus = false;
    this.customerEmployementForm.patchValue({
      employmentStatus: this.applicationData.employmentStatus,
      employerName: this.applicationData.employerName,
      jobTitle: this.applicationData.jobTitle,
      workPhoneNumber: this.applicationData.workPhoneNumber,
      annualIncome: this.applicationData.annualIncome,
      startDate: this.applicationData.startDate ? this.applicationData.startDate : "",
      previousEmployerName: this.applicationData.previousEmployerName,
      previousJobTitle: this.applicationData.previousJobTitle,
      previousPhoneNumber: this.applicationData.previousPhoneNumber,
      previousAnnualIncome: this.applicationData.previousAnnualIncome,
      previousEmploymentStartDate: this.applicationData.previousEmploymentStartDate ? this.applicationData.previousEmploymentStartDate : "",
      previousEmploymentEndDate: this.applicationData.previousEmploymentEndDate ? this.applicationData.previousEmploymentEndDate : "",
      additionalIncomeSource: this.applicationData.additionalIncomeSource,
      additionalIncome: this.applicationData.additionalIncome
    })
    this.loading = false

  }

  employeeStatusChange() {

    if (this.customerEmployementForm.value.employmentStatus === 'OE' || this.customerEmployementForm.value.employmentStatus === 'RET' || this.customerEmployementForm.value.employmentStatus === 'SLFE' || this.customerEmployementForm.value.employmentStatus === 'STU') {
      this.hasEmployement = false;
      if (!this.additionalIncomeStatus) {
        this.toggleAdditionalIncomeStatus()
      }

    } else {
      this.hasEmployement = true;
      if (this.additionalIncomeStatus) {
        this.toggleAdditionalIncomeStatus()
      }

    }
  }

  isSDateValid(value: string) {
    this.sDaysError = "";
    this.sMonthsError = "";
    this.sYearsError = "";
    this.isSDateValidFo = true;
    this.submitted = false
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.isSDateInfuture = false : this.isSDateInfuture = true;
    }
    if (parseInt(value.substr(3, 2)) > 31) {
      this.sDaysError = "Invalid Day";
      this.isSDateValidFo = false
    }
    // 02/12/1999
    if (parseInt(value.substr(0, 2)) > 12) {
      this.sMonthsError = "Invalid month";
      this.isSDateValidFo = false
    }

    var currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear) {

      this.sYearsError = "Invalid year";
      this.isPrevEnDateValidFor = false

    }

  }

  isPrevStDateValid(value: string) {


    this.prevStDaysError = "";
    this.prevStMonthsError = "";
    this.prevStYearsError = "";
    this.isPrevStDateValidFor = true;
    this.submitted = false
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.prevStIsDateInfure = false : this.prevStIsDateInfure = true;
    }
    if (parseInt(value.substr(3, 2)) > 31) {
      this.prevStDaysError = "Invalid Day";
      this.isPrevStDateValidFor = false
    }
    // 02/12/1999
    if (parseInt(value.substr(0, 2)) > 12) {
      this.prevStMonthsError = "Invalid month";
      this.isPrevStDateValidFor = false
    }

    var currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear) {

      this.prevStYearsError = "Invalid year";
      this.isPrevStDateValidFor = false

    }

  }
  isPrevEnDateValid(value: string) {

    this.prevEnDaysError = "";
    this.prevEnMonthsError = "";
    this.prevEnYearsError = "";
    this.isPrevEnDateValidFor = true;
    this.submitted = false
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.prevEnIsDateInfure = false : this.prevEnIsDateInfure = true;
    }
    if (parseInt(value.substr(3, 2)) > 31) {
      this.prevEnDaysError = "Invalid Day";
      this.isPrevEnDateValidFor = false
    }
    // 02/12/1999
    if (parseInt(value.substr(0, 2)) > 12) {
      this.prevEnMonthsError = "Invalid month";
      this.isPrevEnDateValidFor = false
    }

    var currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear) {

      this.prevEnYearsError = "Invalid year";
      this.isPrevEnDateValidFor = false

    }

  }

  calcCurrentWeeklyMonthlySalary() {

    this.currentWeekSalary = this.customerEmployementForm.value.annualIncome ? (parseFloat(this.customerEmployementForm.value.annualIncome) / 52).toFixed(2) : null
    this.currentMonthlySalary = this.customerEmployementForm.value.annualIncome ? (parseFloat(this.customerEmployementForm.value.annualIncome) / 12).toFixed(2) : null
  }
  calcPrevWeeklyMonthlySalary() {
    this.prevWeekSalary = this.customerEmployementForm.value.previousAnnualIncome ? (parseFloat(this.customerEmployementForm.value.previousAnnualIncome) / 52).toFixed(2) : null;
    this.prevMonthlySalary = this.customerEmployementForm.value.previousAnnualIncome ? (parseFloat(this.customerEmployementForm.value.previousAnnualIncome) / 12).toFixed(2) : null
  }
  calcAddWeeklyMonthlySalary() {
    this.addWeekSalary = this.customerEmployementForm.value.additionalIncome ? (parseFloat(this.customerEmployementForm.value.additionalIncome) / 52).toFixed(2) : null
    this.addMonthlySalary = this.customerEmployementForm.value.additionalIncome ? (parseFloat(this.customerEmployementForm.value.additionalIncome) / 12).toFixed(2) : null
  }

  get employmentStatus() { return this.customerEmployementForm.get('employmentStatus'); }
  get employerName() { return this.customerEmployementForm.get('employerName'); }
  get jobTitle() { return this.customerEmployementForm.get('jobTitle'); }
  get workPhoneNumber() { return this.customerEmployementForm.get('workPhoneNumber'); }
  get annualIncome() { return this.customerEmployementForm.get('annualIncome'); }
  get startDate() { return this.customerEmployementForm.get('startDate'); }
  get previousEmployerName() { return this.customerEmployementForm.get('previousEmployerName'); }
  get previousJobTitle() { return this.customerEmployementForm.get('previousJobTitle'); }
  get previousPhoneNumber() { return this.customerEmployementForm.get('previousPhoneNumber'); }
  get previousAnnualIncome() { return this.customerEmployementForm.get('previousAnnualIncome'); }
  get previousEmploymentStartDate() { return this.customerEmployementForm.get('previousEmploymentStartDate'); }
  get previousEmploymentEndDate() { return this.customerEmployementForm.get('previousEndDate'); }
  get additionalIncomeSource() { return this.customerEmployementForm.get('additionalIncomeSource'); }
  get additionalIncome() { return this.customerEmployementForm.get('additionalIncome'); }


}
