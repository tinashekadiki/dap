import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApplicationData, Link } from 'src/app/data/models/formdata.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-finacialinfo',
  templateUrl: './financial-info.component.html',
  styleUrls: ['./financial-info.component.css']
})
export class FinancialInfoComponent implements OnInit {
  error: string;
  linkData: Link;
  applicationData: ApplicationData;
  customerFinancialForm: FormGroup;
  loading = false;
  submitLoad = false;
  bankruptcy = false;
  reposession = false;
  submitted= false;

  isReDateValidFo = true;
  reMonthsError = "";
  reDaysError = "";
  reYearsError = "";
  isReDateInfuture = false;

  isBaDateValidFo = true;
  baMonthsError = "";
  baDaysError = "";
  baYearsError = "";
  isBaDateInfuture = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private apiService: ApiService,
    private formatDataService: FormatDataService,
    private fb: FormBuilder,
    private notificationsService: AlertService) {
    this.titleService.setTitle('Digital Application Form - Financial');
  }

  ngOnInit(): void {
    this.customerFinancialForm = this.fb.group({
      bankruptcy: [true, Validators.required],
      reposession: [true, Validators.required],
      reposessionDate: [""],
      bankruptcyDate: [""]
    })
    this.linkData = JSON.parse(sessionStorage.getItem('link'))
    this.retrieveApplication()
  }

  submitForm() {
    this.submitLoad = true;
    this.submitted = true;
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
      "employmentStatus": this.applicationData.employmentStatus,
      "employerName": this.applicationData.employerName,
      "jobTitle": this.applicationData.jobTitle,
      "workPhoneNumber": this.applicationData.workPhoneNumber,
      "annualIncome": this.applicationData.annualIncome,
      "startDate": this.applicationData.startDate ? this.applicationData.startDate : "",
      "additionalIncome": this.applicationData.additionalIncome,
      "additionalIncomeSource": this.applicationData.additionalIncomeSource,
      "bankruptcy": this.customerFinancialForm.value.bankruptcy,
      "reposession": this.customerFinancialForm.value.reposession,
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
      "housingStatus": this.applicationData.housingStatus,
      "preferredContactMethod": this.applicationData.preferredContactMethod,
      "preferredLanguage": "english",
      "otherPhoneNumber": this.applicationData.otherPhoneNumber,
      "eventId": this.applicationData.eventId,
      "timeAtPreviousAddressYears": this.applicationData.timeAtPreviousAddressYears,
      "timeAtPreviousAddressMonths": this.applicationData.timeAtPreviousAddressMonths,
      "bankruptcyDate": this.customerFinancialForm.value.bankruptcyDate,
      "reposessionDate": this.customerFinancialForm.value.reposessionDate,
    }
    if (this.customerFinancialForm.valid && this.isReDateValidFo && this.isBaDateValidFo) {
      this.apiService.saveApplicationData(dataToPost);
      if (this.linkData.linkType == "dual") {
        this.apiService.applicationComplete(this.linkData.uniqueId, dataToPost).subscribe(data => {
          this.apiService.previewAppication(this.linkData.uniqueId).subscribe((pdata: any) => {
            console.log(pdata);
            if (pdata.body.openLink) {
              if (pdata.body.response.previewApplication) {
                this.router.navigate(['redirect']);
              } else {
                this.router.navigate(['waiting-page']);
              }
            } else {
              this.router.navigateByUrl('link-invalid');
            }
          })
        }, error => {
          console.warn(error)
          this.notificationsService.showError('Failed to preview application please try again', '');
        })
      } else {
        this.apiService.applicationComplete(this.linkData.uniqueId, dataToPost).subscribe(data => {
          this.router.navigate(['reviewinfo']);
        }, error => {
          console.warn(error)
          this.notificationsService.showError('Failed to preview application please try again', '');
        })
      }
    } else {
      this.submitLoad = false;
      this.loading = false
      this.notificationsService.showError('Please check your fields and try again', '')
    }
  }

  isReDateValid(value: string) {
    this.reDaysError = "";
    this.reMonthsError = "";
    this.reYearsError = "";
    this.isReDateValidFo = true;
    this.submitted = false
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.isReDateInfuture = false : this.isReDateInfuture = true;
    }
    if (parseInt(value.substr(3, 2)) > 31) {
      this.reDaysError = "Invalid Day";
      this.isReDateValidFo = false
    }
    // 02/12/1999
    if (parseInt(value.substr(0, 2)) > 12) {
      this.reMonthsError = "Invalid month";
      this.isReDateValidFo = false
    }

    var currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear) {

      this.reYearsError = "Invalid year";
      this.isReDateValidFo = false

    }
  }
  isBaDateValid(value: string) {
    this.baDaysError = "";
    this.baMonthsError = "";
    this.baYearsError = "";
    this.isBaDateValidFo = true;
    this.submitted = false
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.isBaDateInfuture = false : this.isBaDateInfuture = true;
    }
    if (parseInt(value.substr(3, 2)) > 31) {
      this.baDaysError = "Invalid Day";
      this.isBaDateValidFo = false
    }
    // 02/12/1999
    if (parseInt(value.substr(0, 2)) > 12) {
      this.baMonthsError = "Invalid month";
      this.isBaDateValidFo = false
    }

    var currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear) {

      this.baYearsError = "Invalid year";
      this.isBaDateValidFo = false

    }
  }

  retrieveApplication() {
    this.applicationData = this.apiService.retrieveApplicationData();
    this.customerFinancialForm.patchValue({
      bankruptcy: this.applicationData.bankruptcy,
      reposession: this.applicationData.reposession,
      reposessionDate: this.applicationData.reposessionDate,
      bankruptcyDate: this.applicationData.bankruptcyDate
    })
    this.loading = false;
  }

  // get bankruptcy() { return this.customerFinancialForm.get('bankruptcy'); }

}
