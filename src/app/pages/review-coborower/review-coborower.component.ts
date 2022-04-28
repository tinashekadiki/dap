import { Link } from './../../data/models/formdata.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApplicationData, CustomerInteractionInitialData } from 'src/app/data/models/formdata.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { Body } from '@angular/http/src/body';

@Component({
  selector: 'app-review-coborower',
  templateUrl: './review-coborower.component.html',
  styleUrls: ['./review-coborower.component.scss']
})
export class ReviewCoborowerComponent implements OnInit {

  error: string;
  linkData: Link;
  applicationData: ApplicationData;
  applicationDataBo: any;
  customerCoReviewForm: FormGroup;
  customerCoBReviewForm: FormGroup;
  loading = false;
  submitLoad = false;
  previuosEmployementStatus: boolean;
  additionalIncomeStatus: boolean;
  previousAddressState: boolean;
  previuosEmployementStatusB: boolean;
  additionalIncomeStatusB: boolean;
  previousAddressStateB: boolean;
  isLoadingPage = true;
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
    private fb2: FormBuilder,
    private notificationsService: AlertService,
    public formatDataService: FormatDataService) {
    this.titleService.setTitle('Digital Application Form - Review');
  }

  ngOnInit(): void {
    this.linkData = JSON.parse(sessionStorage.getItem('link'))
    this.employementStatuses = JSON.parse(sessionStorage.getItem('employementStatuses'))
    this.additionalIncomeSources = JSON.parse(sessionStorage.getItem('additionalIncomeSources'))
    this.educationLevels = JSON.parse(sessionStorage.getItem('educationLevels'));
    this.maritalStatuses = JSON.parse(sessionStorage.getItem('maritalStatuses'));
    this.housingStatuses = JSON.parse(sessionStorage.getItem('housingStatuses'))

    this.customerCoReviewForm = this.fb.group({
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
      bankruptcyDate: [""],
      reposessionDate: [""],
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
      timeAtPreviousAddressMonths: [""],
      timeAtPreviousAddressYears: [""],
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

    })

    this.customerCoBReviewForm = this.fb2.group({
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
      bankruptcyDate: [""],
      reposessionDate: [""],
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
      timeAtPreviousAddressMonths: [""],
      timeAtPreviousAddressYears: [""],
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

    })

    this.apiService.previewAppication(this.linkData.uniqueId).subscribe((data: any) => {
      console.log(data);
      if (data.body.openLink) {
        this.retrieveApplication(data.body.response.borrower, data.body.response.coBorrower)
      } else {
        this.router.navigateByUrl('link-invalid');
      }
    }, error => {
      console.warn(error);
    })
  }


  formatAnnualIncome(currency: string | number) {
    this.customerCoReviewForm.patchValue({
      annualIncome: this.formatDataService.formatCurrency(currency),
    });
  }


  formatAdditionalAnnualIncome(currency: string | number) {
    this.customerCoReviewForm.patchValue({
      additionalIncome: this.formatDataService.formatCurrency(currency),
    });
  }

  updateMonths(value: number) {
    if (value >= 12) {
      this.customerCoReviewForm.patchValue({
        timeAtAddressYears: this.customerCoReviewForm.value.timeAtAddressYears += parseInt((value / 12).toString()),
        timeAtAddressMonths: value % 12
      });
    }
  }

  retrieveApplication(globalCustomerId: string, globalCustomerIdBo: string) {
    const payload = {
      globalCustomerId: globalCustomerIdBo,
      coborrowerId: globalCustomerId
    };

    this.applicationData = this.apiService.retrieveApplicationData()
    this.applicationData.previousEmployerName ? this.previuosEmployementStatus = true : this.previuosEmployementStatus = false;
    this.applicationData.additionalIncomeSource ? this.additionalIncomeStatus = true : this.additionalIncomeStatus = false;
    this.applicationData.previousAddress ? this.previousAddressState = true : this.previousAddressState = false;
    this.customerCoReviewForm.patchValue({
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

    this.apiService.retrieveApplicationCo(payload, this.linkData.uniqueId).subscribe((data: any) => {

      this.applicationDataBo = data.body.response
      this.applicationDataBo.previousEmployerName ? this.previuosEmployementStatusB = true : this.previuosEmployementStatusB = false;
      this.applicationDataBo.additionalIncomeSource ? this.additionalIncomeStatusB = true : this.additionalIncomeStatusB = false;
      this.applicationDataBo.previousAddress ? this.previousAddressStateB = true : this.previousAddressStateB = false;
      this.customerCoBReviewForm.patchValue({
        id: this.applicationDataBo.id,
        firstName: this.applicationDataBo.firstName,
        middleName: this.applicationDataBo.middleName,
        lastName: this.applicationDataBo.lastName,
        birthday: this.formatDataService.dateFormat(this.applicationDataBo.birthday),
        ssn: this.applicationDataBo.ssn,
        email: this.applicationDataBo.email,
        apartmentUnit: this.applicationDataBo.apartmentUnit,
        previousApartmentUnit: this.applicationDataBo.previousApartmentUnit,
        confirmedEmailAddress: this.applicationDataBo.confirmedEmailAddress,
        phoneNumber: this.applicationDataBo.phoneNumber,
        address: this.applicationDataBo.address,
        city: this.applicationDataBo.city,
        state: this.applicationDataBo.state,
        zip: this.applicationDataBo.zip,
        employmentStatus: this.applicationDataBo.employmentStatus.name,
        employerName: this.applicationDataBo.employerName,
        jobTitle: this.applicationDataBo.jobTitle,
        workPhoneNumber: this.applicationDataBo.workPhoneNumber,
        additionalIncomeSource: this.applicationDataBo.additionalIncomeSource.name,
        previousCity: this.applicationDataBo.previousCity,
        annualIncome: this.applicationDataBo.annualIncome,
        startDate: this.formatDataService.dateFormat(this.applicationDataBo.startDate),
        additionalIncome: this.applicationDataBo.additionalIncome,
        bankruptcy: this.applicationDataBo.bankruptcy,
        reposession: this.applicationDataBo.reposession,
        lease: this.applicationDataBo.lease,
        relation: this.applicationDataBo.relation,
        relatedTo: this.applicationDataBo.relatedTo,
        equifax: this.applicationDataBo.equifax,
        transunion: this.applicationDataBo.transunion,
        experian: this.applicationDataBo.experian,
        globalCustomerId: this.applicationDataBo.globalCustomerId,
        requestType: this.applicationDataBo.requestType,
        transactionId: this.applicationDataBo.transactionId,
        branchId: this.applicationDataBo.branchId,
        parentId: this.applicationDataBo.parentId,
        driversLicenseNumber: this.applicationDataBo.driversLicenseNumber,
        ownership: this.applicationDataBo.ownership,
        monthlyRent: this.applicationDataBo.monthlyRent,
        monthlyMortgage: this.applicationDataBo.monthlyMortgage,
        maritalStatus: this.applicationDataBo.maritalStatus.name,
        numberOfDependents: this.applicationDataBo.numberOfDependents,
        educationLevel: this.applicationDataBo.educationLevel.name,
        previousZip: this.applicationDataBo.previousZip,
        previousAddress: this.applicationDataBo.previousAddress,
        previousState: this.applicationDataBo.previousState,
        timeAtAddressYears: this.applicationDataBo.timeAtAddressYears,
        timeAtAddressMonths: this.applicationDataBo.timeAtAddressMonths,
        timeAtPreviousAddressYears: this.applicationDataBo.timeAtPreviousAddressYears,
        timeAtPreviousAddressMonths: this.applicationDataBo.timeAtPreviousAddressMonths,
        previousEmployerName: this.applicationDataBo.previousEmployerName,
        previousJobTitle: this.applicationDataBo.previousJobTitle,
        previousPhoneNumber: this.applicationDataBo.previousPhoneNumber,
        previousAnnualIncome: this.applicationDataBo.previousAnnualIncome,
        previousEmploymentStartDate: this.applicationDataBo.previousEmploymentStartDate ? this.formatDataService.dateFormat(this.applicationDataBo.previousEmploymentStartDate) : "",
        previousEmploymentEndDate: this.applicationDataBo.previousEmploymentEndDate ? this.formatDataService.dateFormat(this.applicationDataBo.previousEmploymentEndDate) : "",
        blcTransactionId: this.applicationDataBo.blcTransactionId,
        eventId: this.applicationDataBo.eventId,
        completed: this.applicationDataBo.completed,
        relatedToCompleted: this.applicationDataBo.relatedToCompleted,
        title: this.applicationDataBo.title,
        relationship: this.applicationDataBo.relationship,
        suffix: this.applicationDataBo.suffix,
        prefix: this.applicationDataBo.prefix,
        driversLicenceState: this.applicationDataBo.driversLicenceState,
        housingStatus: this.applicationDataBo.housingStatus.name,
        preferredContactMethod: this.applicationDataBo.preferredContactMethod,
        preferredLanguage: this.applicationDataBo.preferredLanguage,
        otherPhoneNumber: this.applicationDataBo.otherPhoneNumber,
        canPreview: this.applicationDataBo.canPreview,
        relatedToCanPreview: this.applicationDataBo.relatedToCanPreview,
        reposessionDate: this.applicationDataBo.reposessionDate ? this.formatDataService.dateFormat(this.applicationDataBo.reposessionDate) : "",
        bankruptcyDate: this.applicationDataBo.bankruptcyDate ? this.formatDataService.dateFormat(this.applicationDataBo.bankruptcyDate) : "",
      })
      this.loading = false
      this.isLoadingPage = false
    }, error => {
      console.warn(error);
      this.loading = false
      this.isLoadingPage = false
    })
  }

  submitForm() {
    this.submitLoad = true;
    const dataToPost: any = {
      "applicationId": this.linkData.uniqueId,
      "firstName": this.customerCoReviewForm.value.firstName,
      "middleName": this.customerCoReviewForm.value.middleName,
      "lastName": this.customerCoReviewForm.value.lastName,
      "birthday": this.customerCoReviewForm.value.birthday,
      "ssn": this.customerCoReviewForm.value.ssn,
      "email": this.customerCoReviewForm.value.email,
      "confirmedEmailAddress": this.customerCoReviewForm.value.confirmedEmailAddress,
      "phoneNumber": this.customerCoReviewForm.value.phoneNumber,
      "apartmentUnit": this.customerCoReviewForm.value.apartmentUnit,
      "previousApartmentUnit": this.customerCoReviewForm.value.previousApartmentUnit,
      "address": this.customerCoReviewForm.value.address,
      "city": this.customerCoReviewForm.value.city,
      "state": this.customerCoReviewForm.value.state,
      "zip": this.customerCoReviewForm.value.zip,
      "employmentStatus": this.customerCoReviewForm.value.employmentStatus,
      "employerName": this.customerCoReviewForm.value.employerName,
      "jobTitle": this.customerCoReviewForm.value.jobTitle,
      "workPhoneNumber": this.customerCoReviewForm.value.workPhoneNumber,
      "annualIncome": this.customerCoReviewForm.value.annualIncome,
      "startDate": this.customerCoReviewForm.value.startDate,
      "additionalIncome": this.customerCoReviewForm.value.additionalIncome,
      "additionalIncomeSource": this.customerCoReviewForm.value.additionalIncomeSource,
      "bankruptcy": this.customerCoReviewForm.value.bankruptcy,
      "reposession": this.customerCoReviewForm.value.reposession,
      "lease": this.customerCoReviewForm.value.lease,
      "driversLicenseNumber": this.customerCoReviewForm.value.driversLicenseNumber,
      "ownership": this.customerCoReviewForm.value.ownership,
      "monthlyRent": this.customerCoReviewForm.value.monthlyRent,
      "monthlyMortgage": this.customerCoReviewForm.value.monthlyMortgage,
      "maritalStatus": this.customerCoReviewForm.value.maritalStatus,
      "numberOfDependents": this.customerCoReviewForm.value.numberOfDependents,
      "educationLevel": this.customerCoReviewForm.value.educationLevel,
      "previousZip": this.customerCoReviewForm.value.previousZip,
      "previousAddress": this.customerCoReviewForm.value.previousAddress,
      "previousState": this.customerCoReviewForm.value.previousState,
      "previousCity": this.customerCoReviewForm.value.previousCity,
      "timeAtAddressYears": this.customerCoReviewForm.value.timeAtAddressYears,
      "timeAtAddressMonths": this.customerCoReviewForm.value.timeAtAddressMonths,
      "previousEmployerName": this.customerCoReviewForm.value.previousEmployerName,
      "previousJobTitle": this.customerCoReviewForm.value.previousJobTitle,
      "previousPhoneNumber": this.customerCoReviewForm.value.previousPhoneNumber,
      "previousAnnualIncome": this.customerCoReviewForm.value.previousAnnualIncome,
      "previousEmploymentStartDate": this.customerCoReviewForm.value.previousEmploymentStartDate ? this.customerCoReviewForm.value.previousEmploymentStartDate : "",
      "previousEmploymentEndDate": this.customerCoReviewForm.value.previousEmploymentEndDate ? this.customerCoReviewForm.value.previousEmploymentEndDate : "",
      "title": this.customerCoReviewForm.value.title,
      "relationship": this.customerCoReviewForm.value.relationship,
      "suffix": this.customerCoReviewForm.value.suffix,
      "prefix": this.customerCoReviewForm.value.prefix,
      "driversLicenceState": this.customerCoReviewForm.value.driversLicenceState,
      "housingStatus": this.customerCoReviewForm.value.housingStatus,
      "preferredContactMethod": this.customerCoReviewForm.value.preferredContactMethod,
      "preferredLanguage": "english",
      "otherPhoneNumber": this.customerCoReviewForm.value.otherPhoneNumber,
      "eventId": this.customerCoReviewForm.value.eventId,
      "timeAtPreviousAddressYears": this.customerCoReviewForm.value.timeAtPreviousAddressYears,
      "timeAtPreviousAddressMonths": this.customerCoReviewForm.value.timeAtPreviousAddressMonths,
      "bankruptcyDate": this.customerCoReviewForm.value.bankruptcyDate,
      "reposessionDate": this.customerCoReviewForm.value.reposessionDate,
    }
    this.apiService.saveApplicationData(dataToPost);
    this.submitLoad = false;
    this.router.navigateByUrl('finaldisclosure');
  }

  get housingStatus() { return this.customerCoReviewForm.get('housingStatus'); }
  get monthlyMortgage() { return this.customerCoReviewForm.get('monthlyMortgage'); }
}
