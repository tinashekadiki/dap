import { log } from 'console';
import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApplicationData, Link } from 'src/app/data/models/formdata.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';

@Component({
  selector: 'app-reviewpage',
  templateUrl: './reviewpage.component.html',
  styleUrls: ['./reviewpage.component.css']
})
export class ReviewPageComponent implements OnInit {

  error: string;
  linkData: Link;
  applicationData: ApplicationData;
  customerReviewForm: FormGroup;
  loading: boolean = false;
  submitLoad: boolean = false;
  previuosEmployementStatus: boolean;
  additionalIncomeStatus: boolean;
  previousAddressState: boolean;
  employementStatuses: [];
  additionalIncomeSources: [];
  educationLevels: [];
  maritalStatuses: [];
  housingStatuses: [];
  constructor(
    private titleService: Title,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private notificationsService: AlertService,
    public formatDataService: FormatDataService,
    location: PlatformLocation) {
    this.titleService.setTitle('Digital Application Form - Review');
    location.onPopState(() => {
      window.location.reload();
    });
  }



  ngOnInit(): void {
    this.employementStatuses = JSON.parse(sessionStorage.getItem('employementStatuses'))
    this.additionalIncomeSources = JSON.parse(sessionStorage.getItem('additionalIncomeSources'))
    this.educationLevels = JSON.parse(sessionStorage.getItem('educationLevels'));
    this.maritalStatuses = JSON.parse(sessionStorage.getItem('maritalStatuses'));
    this.housingStatuses = JSON.parse(sessionStorage.getItem('housingStatuses'));

    this.customerReviewForm = this.fb.group({
      id: [""],
      firstName: [""],
      middleName: [""],
      lastName: [""],
      birthday: [""],
      ssn: [""],
      email: [""],
      confirmedEmailAddress: [""],
      phoneNumber: [""],
      apartmentUnit: [""],
      previousApartmentUnit: [""],
      address: [""],
      city: [""],
      state: [""],
      zip: [""],
      employmentStatus: [""],
      employerName: [""],
      jobTitle: [""],
      workPhoneNumber: [""],
      additionalIncomeSource: [""],
      previousCity: [""],
      annualIncome: [""],
      startDate: [""],
      additionalIncome: [""],
      bankruptcy: [""],
      reposession: [""],
      lease: [""],
      relation: [""],
      relatedTo: [""],
      equifax: [""],
      transunion: [""],
      experian: [""],
      globalCustomerId: [""],
      requestType: [""],
      transactionId: [""],
      branchId: [""],
      parentId: [""],
      driversLicenseNumber: [""],
      ownership: [""],
      monthlyRent: [""],
      monthlyMortgage: [""],
      maritalStatus: [""],
      numberOfDependents: [""],
      educationLevel: [""],
      previousZip: [""],
      previousAddress: [""],
      previousState: [""],
      timeAtAddressYears: [""],
      timeAtAddressMonths: [""],
      previousEmployerName: [""],
      previousJobTitle: [""],
      previousPhoneNumber: [""],
      previousAnnualIncome: [""],
      previousEmploymentStartDate: [""],
      previousEmploymentEndDate: [""],
      blcTransactionId: [""],
      eventId: [""],
      completed: ["boolean"],
      relatedToCompleted: [""],
      title: [""],
      relationship: [""],
      suffix: [""],
      prefix: [""],
      driversLicenceState: [""],
      housingStatus: [""],
      preferredContactMethod: [""],
      preferredLanguage: [""],
      otherPhoneNumber: [""],
      canPreview: [""],
      relatedToCanPreview: [""],
      timeAtPreviousAddressYears: [""],
      timeAtPreviousAddressMonths: [""],
      bankruptcyDate: [""],
      reposessionDate: [""]
    })

    this.linkData = JSON.parse(sessionStorage.getItem('link'))
    this.retrieveApplication()
  }
  formatAnnualIncome(currency: string | number) {
    this.customerReviewForm.patchValue({
      annualIncome: this.formatDataService.formatCurrency(currency),
    });
  }


  formatAdditionalAnnualIncome(currency: string | number) {
    this.customerReviewForm.patchValue({
      additionalIncome: this.formatDataService.formatCurrency(currency),
    });
  }

  updateMonths(value: number) {
    if (value >= 12) {
      this.customerReviewForm.patchValue({
        timeAtAddressYears: this.customerReviewForm.value.timeAtAddressYears += parseInt((value / 12).toString()),
        timeAtAddressMonths: value % 12
      });
    }
  }

  retrieveApplication() {

    this.applicationData = this.apiService.retrieveApplicationData()

    this.applicationData.previousEmployerName ? this.previuosEmployementStatus = true : this.previuosEmployementStatus = false;
    this.applicationData.additionalIncomeSource ? this.additionalIncomeStatus = true : this.additionalIncomeStatus = false;
    this.applicationData.previousAddress ? this.previousAddressState = true : this.previousAddressState = false;
    this.customerReviewForm.patchValue({
      id: this.applicationData.id,
      firstName: this.applicationData.firstName,
      middleName: this.applicationData.middleName,
      lastName: this.applicationData.lastName,
      birthday: this.applicationData.birthday,
      ssn: this.applicationData.ssn,
      email: this.applicationData.email,
      apartmentUnit: this.applicationData.apartmentUnit,
      previousApartmentUnit: this.applicationData.previousApartmentUnit,
      confirmedEmailAddress: this.applicationData.confirmedEmailAddress,
      phoneNumber: this.applicationData.phoneNumber,
      address: this.applicationData.address,
      city: this.applicationData.city,
      state: this.applicationData.state,
      zip: this.applicationData.zip,
      employmentStatus: this.applicationData.employmentStatus,
      employerName: this.applicationData.employerName,
      jobTitle: this.applicationData.jobTitle,
      workPhoneNumber: this.applicationData.workPhoneNumber,
      additionalIncomeSource: this.applicationData.additionalIncomeSource,
      previousCity: this.applicationData.previousCity,
      annualIncome: this.applicationData.annualIncome,
      startDate: this.applicationData.startDate,
      additionalIncome: this.applicationData.additionalIncome,
      bankruptcy: this.applicationData.bankruptcy,
      reposession: this.applicationData.reposession,
      lease: this.applicationData.lease,
      relation: this.applicationData.relation,
      relatedTo: this.applicationData.relatedTo,
      equifax: this.applicationData.equifax,
      transunion: this.applicationData.transunion,
      experian: this.applicationData.experian,
      globalCustomerId: this.applicationData.globalCustomerId,
      requestType: this.applicationData.requestType,
      transactionId: this.applicationData.transactionId,
      branchId: this.applicationData.branchId,
      parentId: this.applicationData.parentId,
      driversLicenseNumber: this.applicationData.driversLicenseNumber,
      ownership: this.applicationData.ownership,
      monthlyRent: this.applicationData.monthlyRent,
      monthlyMortgage: this.applicationData.monthlyMortgage,
      maritalStatus: this.applicationData.maritalStatus,
      numberOfDependents: this.applicationData.numberOfDependents,
      educationLevel: this.applicationData.educationLevel,
      previousZip: this.applicationData.previousZip,
      previousAddress: this.applicationData.previousAddress,
      previousState: this.applicationData.previousState,
      timeAtAddressYears: this.applicationData.timeAtAddressYears,
      timeAtAddressMonths: this.applicationData.timeAtAddressMonths,
      previousEmployerName: this.applicationData.previousEmployerName,
      previousJobTitle: this.applicationData.previousJobTitle,
      previousPhoneNumber: this.applicationData.previousPhoneNumber,
      previousAnnualIncome: this.applicationData.previousAnnualIncome,
      previousEmploymentStartDate: this.applicationData.previousEmploymentStartDate ? this.applicationData.previousEmploymentStartDate : "",
      previousEmploymentEndDate: this.applicationData.previousEmploymentEndDate ? this.applicationData.previousEmploymentEndDate : "",
      blcTransactionId: this.applicationData.blcTransactionId,
      eventId: this.applicationData.eventId,
      completed: this.applicationData.completed,
      relatedToCompleted: this.applicationData.relatedToCompleted,
      title: this.applicationData.title,
      relationship: this.applicationData.relationship,
      suffix: this.applicationData.suffix,
      prefix: this.applicationData.prefix,
      driversLicenceState: this.applicationData.driversLicenceState,
      housingStatus: this.applicationData.housingStatus,
      preferredContactMethod: this.applicationData.preferredContactMethod,
      preferredLanguage: this.applicationData.preferredLanguage,
      otherPhoneNumber: this.applicationData.otherPhoneNumber,
      canPreview: this.applicationData.canPreview,
      relatedToCanPreview: this.applicationData.relatedToCanPreview,
      timeAtPreviousAddressYears: this.applicationData.timeAtPreviousAddressYears,
      timeAtPreviousAddressMonths: this.applicationData.timeAtPreviousAddressMonths,
      bankruptcyDate: this.applicationData.bankruptcyDate,
      reposessionDate: this.applicationData.reposessionDate,
    })
    this.loading = false
  }

  submitForm() {
    this.submitLoad = true;
    console.log(this.getFormValidationErrors());

      const dataToPost: any = {
        "applicationId": this.linkData.uniqueId,
        "firstName": this.customerReviewForm.value.firstName,
        "middleName": this.customerReviewForm.value.middleName,
        "lastName": this.customerReviewForm.value.lastName,
        "birthday": this.customerReviewForm.value.birthday,
        "ssn": this.customerReviewForm.value.ssn,
        "email": this.customerReviewForm.value.email,
        "confirmedEmailAddress": this.customerReviewForm.value.confirmedEmailAddress,
        "phoneNumber": this.customerReviewForm.value.phoneNumber,
        "apartmentUnit": this.customerReviewForm.value.apartmentUnit,
        "previousApartmentUnit": this.customerReviewForm.value.previousApartmentUnit,
        "address": this.customerReviewForm.value.address,
        "city": this.customerReviewForm.value.city,
        "state": this.customerReviewForm.value.state,
        "zip": this.customerReviewForm.value.zip,
        "employmentStatus": this.customerReviewForm.value.employmentStatus,
        "employerName": this.customerReviewForm.value.employerName,
        "jobTitle": this.customerReviewForm.value.jobTitle,
        "workPhoneNumber": this.customerReviewForm.value.workPhoneNumber,
        "annualIncome": this.customerReviewForm.value.annualIncome,
        "startDate": this.customerReviewForm.value.startDate,
        "additionalIncome": this.customerReviewForm.value.additionalIncome,
        "additionalIncomeSource": this.customerReviewForm.value.additionalIncomeSource,
        "bankruptcy": this.customerReviewForm.value.bankruptcy,
        "reposession": this.customerReviewForm.value.reposession,
        "lease": this.customerReviewForm.value.lease,
        "driversLicenseNumber": this.customerReviewForm.value.driversLicenseNumber,
        "ownership": this.customerReviewForm.value.ownership,
        "monthlyRent": this.customerReviewForm.value.monthlyRent,
        "monthlyMortgage": this.customerReviewForm.value.monthlyMortgage,
        "maritalStatus": this.customerReviewForm.value.maritalStatus,
        "numberOfDependents": this.customerReviewForm.value.numberOfDependents,
        "educationLevel": this.customerReviewForm.value.educationLevel,
        "previousZip": this.customerReviewForm.value.previousZip,
        "previousAddress": this.customerReviewForm.value.previousAddress,
        "previousState": this.customerReviewForm.value.previousState,
        "previousCity": this.customerReviewForm.value.previousCity,
        "timeAtAddressYears": this.customerReviewForm.value.timeAtAddressYears,
        "timeAtAddressMonths": this.customerReviewForm.value.timeAtAddressMonths,
        "previousEmployerName": this.customerReviewForm.value.previousEmployerName,
        "previousJobTitle": this.customerReviewForm.value.previousJobTitle,
        "previousPhoneNumber": this.customerReviewForm.value.previousPhoneNumber,
        "previousAnnualIncome": this.customerReviewForm.value.previousAnnualIncome,
        "previousEmploymentStartDate": this.customerReviewForm.value.previousEmploymentStartDate ? this.customerReviewForm.value.previousEmploymentStartDate : "",
        "previousEmploymentEndDate": this.customerReviewForm.value.previousEmploymentEndDate ? this.customerReviewForm.value.previousEmploymentEndDate : "",
        "title": this.customerReviewForm.value.title,
        "relationship": this.customerReviewForm.value.relationship,
        "suffix": this.customerReviewForm.value.suffix,
        "prefix": this.customerReviewForm.value.prefix,
        "driversLicenceState": this.customerReviewForm.value.driversLicenceState,
        "housingStatus": this.customerReviewForm.value.housingStatus,
        "preferredContactMethod": this.customerReviewForm.value.preferredContactMethod,
        "preferredLanguage": "english",
        "otherPhoneNumber": this.customerReviewForm.value.otherPhoneNumber,
        "eventId": this.customerReviewForm.value.eventId,
        "timeAtPreviousAddressYears": this.customerReviewForm.value.timeAtPreviousAddressYears,
        "timeAtPreviousAddressMonths": this.customerReviewForm.value.timeAtPreviousAddressMonths,
        "bankruptcyDate": this.customerReviewForm.value.bankruptcyDate,
        "reposessionDate": this.customerReviewForm.value.reposessionDate,
      }
      this.apiService.saveApplicationData(dataToPost);
      this.submitLoad = false;
      this.router.navigateByUrl('finaldisclosure');
  }

  getFormValidationErrors() {
    Object.keys(this.customerReviewForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.customerReviewForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  get housingStatus() { return this.customerReviewForm.get('housingStatus'); }
  get monthlyMortgage() { return this.customerReviewForm.get('monthlyMortgage'); }


}
