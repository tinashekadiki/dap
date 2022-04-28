import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormatDataService } from 'src/app/services/format-data/format-data.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { CustomerData, CustomerInteractionInitialData, Individual, PayPhoneCustomerInformation, Link, ApplicationData } from 'src/app/data/models/formdata.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-personalinfopage',
  templateUrl: './personalinfopage.component.html',
  styleUrls: ['./personalinfopage.component.css']
})
export class PersonalinfoPageComponent implements OnInit {

  PayPhoneInitialData: any;
  PayPhonePersonalData: Individual;
  customerPersonalDataForm: FormGroup;
  customerInteractionInitialData: CustomerInteractionInitialData;
  linkData: Link;
  customerData: CustomerData;
  loading = false;
  verification = false;
  isDateInfuture: boolean;
  applicationData: ApplicationData;
  submitted = false;
  isDateValidFo = true;
  monthsError = '';
  daysError = '';
  yearsError = '';
  dateError = '';
  ssnError = '';

  constructor(
    private router: Router,
    private titleService: Title,
    private formatDataService: FormatDataService,
    private notificationsService: AlertService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle('Digital Application Form  - Personal Information');
  }
  ngOnInit(): void {
    this.PayPhoneInitialData = JSON.parse(sessionStorage.getItem('PayPhoneInitialData') || '{}');
    this.verification = JSON.parse(sessionStorage.getItem('verification'));
    this.linkData = JSON.parse(sessionStorage.getItem('link'));
    this.customerPersonalDataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      middleName: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
    });
    this.customerData = JSON.parse(sessionStorage.getItem('customerData'))
    if (this.verification) {
      this.retrieveApplication();
      this.route.queryParams.subscribe(params => {
        const vfp = params.vfp;
        this.getPayphoneDetails(vfp, this.linkData.uniqueId);
      });
    } else {
      this.retrieveApplication();
    }
  }

  submitForm() {
    this.loading = true;
    this.submitted = true;
    if (this.customerPersonalDataForm.valid && this.isDateValidFo) {
      var dataToPost: any = {
        "applicationId": this.linkData.uniqueId,
        "firstName": this.customerPersonalDataForm.value.firstName,
        "middleName": this.customerPersonalDataForm.value.middleName,
        "lastName": this.customerPersonalDataForm.value.lastName,
        "birthday": this.customerPersonalDataForm.value.dateOfBirth,
        "ssn": this.customerPersonalDataForm.value.socialSecurityNumber,
        "driversLicenseNumber": this.customerData.CustomerPersonalDetails.licenseIdNumber,
        "eventId": this.customerData.EventCode,
        "email": this.applicationData.email,
        "confirmedEmailAddress": this.applicationData.confirmedEmailAddress,
        "phoneNumber": this.applicationData.phoneNumber,
        "address": this.customerPersonalDataForm.value.address,
        "city": this.customerPersonalDataForm.value.city,
        "state": this.customerPersonalDataForm.value.state,
        "zip": this.customerPersonalDataForm.value.zip,
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
        "ownership": this.applicationData.ownership,
        "monthlyRent": this.applicationData.monthlyRent,
        "monthlyMortgage": this.applicationData.monthlyMortgage,
        "maritalStatus": this.applicationData.maritalStatus,
        "numberOfDependents": this.applicationData.numberOfDependents,
        "educationLevel": this.applicationData.educationLevel,
        "previousZip": this.applicationData.previousZip,
        "previousAddress": this.applicationData.previousAddress,
        "previousState": this.applicationData.previousState,
        "timeAtAddressYears": this.applicationData.timeAtAddressYears,
        "timeAtAddressMonths": this.applicationData.timeAtAddressMonths,
        "timeAtPreviousAddressYears": this.applicationData.timeAtPreviousAddressYears,
        "timeAtPreviousAddressMonths": this.applicationData.timeAtPreviousAddressMonths,
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
        "preferredLanguage": this.applicationData.preferredLanguage,
        "otherPhoneNumber": this.applicationData.otherPhoneNumber,
        "apartmentUnit": this.applicationData.apartmentUnit,
        "previousApartmentUnit": this.applicationData.previousApartmentUnit,
        "previousCity": this.applicationData.previousCity,
      };
      this.loading = false;
      this.apiService.saveApplicationData(dataToPost);
      this.router.navigateByUrl('additionalpersonalinfo');
    } else {
      this.loading = false;
      // console.log(this.customerPersonalDataForm);
      // this.notificationsService.showError('Please check your fields and try again', '')
    }
  }

  retrieveApplication() {
    this.applicationData = this.apiService.retrieveApplicationData();
    this.customerPersonalDataForm.patchValue({
      firstName: this.applicationData.firstName,
      middleName: this.applicationData.middleName,
      lastName: this.applicationData.lastName,
      dateOfBirth: this.applicationData.birthday,
      socialSecurityNumber: this.applicationData.ssn,
      address: this.applicationData.address,
      city: this.applicationData.city,
      state: this.applicationData.state,
      zip: this.applicationData.zip,
    });
  }

  isDateValid(value: string) {
    this.daysError = '';
    this.monthsError = '';
    this.yearsError = '';
    this.isDateValidFo = true;
    this.submitted = false;
    if (value.length !== 10){
      this.isDateValidFo = false;
      this.dateError = 'Invalid Date of Birth';
    }
    if (value.length === 10) {
      moment().diff(new Date(value), 'years') < 1 ? this.isDateInfuture = false : this.isDateInfuture = true;
    }

    if (parseInt(value.substr(3, 2), 10) > 31 || parseInt(value.substr(3, 2)) <= 0) {
      this.daysError = 'Invalid Day of Birth';
      this.isDateValidFo = false;
    }

    if (parseInt(value.substr(0, 2)) > 12 || parseInt(value.substr(0, 2)) <= 0) {

      this.monthsError = 'Invalid Month of Birth';
      this.isDateValidFo = false;

    }
    const currentYear = new Date().getFullYear();

    if (parseInt(value.substr(6, 4)) > currentYear || parseInt(value.substr(6, 4)) <= 0) {

      this.yearsError = 'Invalid year';
      this.isDateValidFo = false;

    }
  }

  isValidSsn(value: string){
    const stringSsn = value.replace(/-/gi, '');
    const firstElement = value.charAt(0);
    if(parseInt(stringSsn) === 0 || value.length !== 11 || parseInt(value.charAt(0)) === 0){
      this.ssnError = 'Invalid SSN';
    }
    else {
      this.ssnError = '';
    }
  }

  getPayphoneDetails(vfp: any, uniqueId: string) {
    const dataToPost = JSON.stringify({
      requestId: this.PayPhoneInitialData.response.RequestId,
      verificationFingerprint: vfp
    });
    if (this.PayPhoneInitialData.response.Response.RedirectTargetUrl) {
      this.apiService.mobileAuthVerificationFinish(uniqueId, dataToPost).subscribe((data: any) => {
        console.log(data);
        if (data.body.response.status === 0 || data.body.response.status === 0) {
          sessionStorage.setItem('verification', JSON.stringify(true))
          const payPhoneCustomerInformation: PayPhoneCustomerInformation = data.body.response

          this.apiService.setPayphoneIndividual(data.body.response)
          // sessionStorage.setItem('payPhoneIndividualData', JSON.stringify(payPhoneCustomerInformation.response.individual))
          this.PayPhonePersonalData = payPhoneCustomerInformation.response.individual;
          this.customerPersonalDataForm.patchValue({
            firstName: this.PayPhonePersonalData.firstName,
            middlename: this.PayPhonePersonalData.middleName,
            lastName: this.PayPhonePersonalData.lastName,
            address: this.PayPhonePersonalData?.addresses[0]?.address,
            city: this.PayPhonePersonalData?.addresses[0]?.city,
            state: this.PayPhonePersonalData?.addresses[0]?.region,
            zip: this.PayPhonePersonalData?.addresses[0]?.postalCode,
            dateOfBirth: this.formatDataService.dateFormatFromBiometrics(this.customerData.CustomerBiometricDetail.correctDateOfBirth)
          })
          this.applicationData.phoneNumber = this.customerData.CustomerContactDetails.cellPhone
        } else {
          this.customerPersonalDataForm.patchValue({
            dateOfBirth: ''
          });
          sessionStorage.setItem('verification', JSON.stringify(false))
        }
      }, error => {
        console.warn(error);
        console.log(JSON.parse(error.error.error));
        error = JSON.parse(error.error.error);
        if ((error.body.Status) >= 1000) {
          this.customerPersonalDataForm.patchValue({
            dateOfBirth: ''
          });
        }
        sessionStorage.setItem('verification', JSON.stringify(false))

      })
    } else {
      // this.apiService.mobileAuthVerificationFinish(uniqueId, dataToPost).subscribe((data: any) => {
      //   if (data.body.response.status === 0 || data.body.response.status === 0) {
      //     sessionStorage.setItem('verification', JSON.stringify(true))
      //     const payPhoneCustomerInformation: PayPhoneCustomerInformation = data.body.response
      //     this.PayPhonePersonalData = payPhoneCustomerInformation.response.individual;
      //     this.customerPersonalDataForm.patchValue({
      //       firstName: this.PayPhonePersonalData.firstName,
      //       middlename: "",
      //       lastName: this.PayPhonePersonalData.lastName,
      //       dateOfBirth: this.formatDataService.dateFormat(this.customerData.CustomerBiometricDetail.correctDateOfBirth)
      //     })
      //   } else {
      //     sessionStorage.setItem('verification', JSON.stringify(false))
      //     this.customerPersonalDataForm.patchValue({
      //       dateOfBirth: ""
      //     })
      //   }
      // }, error => {
      //   console.log(JSON.parse(error.error.error));
      //   if (error.error.error.body.Status === 1000 || error.error.error.body.Status === "1000") {
      //     sessionStorage.setItem('verification', JSON.stringify(false))
      //     this.customerPersonalDataForm.patchValue({
      //       dateOfBirth: ""
      //     })
      //   }
      // })
      sessionStorage.setItem('verification', JSON.stringify(false));
    }
  }

  get firstName() { return this.customerPersonalDataForm.get('firstName'); }
  get lastName() { return this.customerPersonalDataForm.get('lastName'); }
  get middleName() { return this.customerPersonalDataForm.get('middleName'); }
  get dateOfBirth() { return this.customerPersonalDataForm.get('dateOfBirth'); }
  get socialSecurityNumber() { return this.customerPersonalDataForm.get('socialSecurityNumber'); }

}
