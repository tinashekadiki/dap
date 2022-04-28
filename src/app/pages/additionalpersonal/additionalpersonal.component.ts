import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormatDataService} from 'src/app/services/format-data/format-data.service';
import {AlertService} from 'src/app/services/alerts/alert.service';
import {ApplicationData, CustomerData, Link} from 'src/app/data/models/formdata.model';
import {ApiService} from 'src/app/services/api/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {threadId} from 'worker_threads';

@Component({
  selector: 'app-additionalpersonal',
  templateUrl: './additionalpersonal.component.html',
  styleUrls: ['./additionalpersonal.component.css']
})
export class AdditionalpersonalComponent implements OnInit {
  error: string;
  applicationData: ApplicationData;
  linkData: Link;
  customerPersonalAdditionalDataForm: FormGroup;
  loading = false;
  submitLoad = false;
  submitted = false;
  emailMatch = true;
  verification: boolean;
  maritalStatuses: [];
  educationLevels: [];
  customerData: CustomerData;
  isValidNumberOfDependants = true;


  constructor(private router: Router,
              private notificationsService: AlertService,
              private apiService: ApiService,
              public formatDataService: FormatDataService,
              private fb: FormBuilder,
              private titleService: Title
  ) {
    this.titleService.setTitle('Digital Application Form - Contact & Personal');
    this.customerPersonalAdditionalDataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmedEmailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      educationLevel: ['', Validators.required],
      numberOfDependents: [''],
    });
  }

  ngOnInit(): void {
    this.verification = JSON.parse(sessionStorage.getItem('verification'));
    this.educationLevels = JSON.parse(sessionStorage.getItem('educationLevels'));
    this.maritalStatuses = JSON.parse(sessionStorage.getItem('maritalStatuses'));
    this.customerData = JSON.parse(sessionStorage.getItem('customerData'));
    this.customerPersonalAdditionalDataForm.valueChanges.subscribe(value => {
      console.log(value);
      if (!this.isANumber(value.numberOfDependents)){
        this.isValidNumberOfDependants = false;
      }
      else if (this.isANumber(value.numberOfDependents)){
        this.isValidNumberOfDependants = true;
      }
    });
    this.linkData = JSON.parse(sessionStorage.getItem('link'));
    this.retrieveApplication();
  }

  isANumber(value: string): boolean{
    return parseInt(value, 10) >= 0 || value === null || value.length === 0;
  }

  compareEmails() {
    this.removeEmailSpace(this.customerPersonalAdditionalDataForm.value.email)
    !== this.removeEmailSpace(this.customerPersonalAdditionalDataForm.value.confirmedEmailAddress) ?
      this.emailMatch = false : this.emailMatch = true;
  }

  removeEmailSpace(email: string) {
    return email.replace(/\s/g, '');
  }

  retrieveApplication() {
    this.applicationData = this.apiService.retrieveApplicationData();
    this.applicationData.email ? this.compareEmails() : '';

    this.customerPersonalAdditionalDataForm.patchValue({
      email: this.applicationData.email,
      confirmedEmailAddress: this.applicationData.confirmedEmailAddress,
      phoneNumber: this.applicationData.phoneNumber,
      maritalStatus: this.applicationData.maritalStatus,
      educationLevel: this.applicationData.educationLevel,
      numberOfDependents: this.applicationData.numberOfDependents > 0 ? this.applicationData.numberOfDependents : null,
    });

  }

  submitForm() {
    this.submitLoad = true;
    this.submitted = true;
    if (this.customerPersonalAdditionalDataForm.valid && this.isValidNumberOfDependants) {
      let dataToPost: any = {
        applicationId: this.linkData.uniqueId,
        firstName: this.applicationData.firstName,
        middleName: this.applicationData.middleName,
        lastName: this.applicationData.lastName,
        birthday: this.applicationData.birthday,
        ssn: this.applicationData.ssn,
        email: this.customerPersonalAdditionalDataForm.value.email,
        confirmedEmailAddress: this.customerPersonalAdditionalDataForm.value.confirmedEmailAddress,
        phoneNumber: this.customerPersonalAdditionalDataForm.value.phoneNumber,
        address: this.applicationData.address,
        city: this.applicationData.city,
        state: this.applicationData.state,
        zip: this.applicationData.zip,
        employmentStatus: this.applicationData.employmentStatus,
        employerName: this.applicationData.employerName,
        jobTitle: this.applicationData.jobTitle,
        workPhoneNumber: this.applicationData.workPhoneNumber,
        annualIncome: this.applicationData.annualIncome,
        startDate: this.applicationData.startDate ? this.applicationData.startDate : '',
        additionalIncome: this.applicationData.additionalIncome,
        additionalIncomeSource: this.applicationData.additionalIncomeSource,
        bankruptcy: this.applicationData.bankruptcy,
        reposession: this.applicationData.reposession,
        lease: this.applicationData.lease,
        reposessionDate: this.applicationData.reposessionDate,
        bankruptcyDate: this.applicationData.bankruptcyDate,
        driversLicenseNumber: this.applicationData.driversLicenseNumber,
        ownership: this.applicationData.ownership,
        monthlyRent: this.applicationData.monthlyRent,
        monthlyMortgage: this.applicationData.monthlyMortgage,
        maritalStatus: this.customerPersonalAdditionalDataForm.value.maritalStatus,
        numberOfDependents: this.customerPersonalAdditionalDataForm.value.numberOfDependents,
        educationLevel: this.customerPersonalAdditionalDataForm.value.educationLevel,
        previousZip: this.applicationData.previousZip,
        previousAddress: this.applicationData.previousAddress,
        previousState: this.applicationData.previousState,
        timeAtAddressYears: this.applicationData.timeAtAddressYears,
        timeAtAddressMonths: this.applicationData.timeAtAddressMonths,
        timeAtPreviousAddressYears: this.applicationData.timeAtPreviousAddressYears,
        timeAtPreviousAddressMonths: this.applicationData.timeAtPreviousAddressMonths,
        previousEmployerName: this.applicationData.previousEmployerName,
        previousJobTitle: this.applicationData.previousJobTitle,
        previousPhoneNumber: this.applicationData.previousPhoneNumber,
        previousAnnualIncome: this.applicationData.previousAnnualIncome,
        previousEmploymentStartDate: this.applicationData.previousEmploymentStartDate ? this.applicationData.previousEmploymentStartDate : '',
        previousEmploymentEndDate: this.applicationData.previousEmploymentEndDate ? this.applicationData.previousEmploymentEndDate : '',
        title: this.applicationData.title,
        relationship: this.applicationData.relationship,
        suffix: this.applicationData.suffix,
        prefix: this.applicationData.prefix,
        driversLicenceState: this.applicationData.driversLicenceState,
        housingStatus: this.applicationData.housingStatus,
        preferredContactMethod: this.applicationData.preferredContactMethod,
        preferredLanguage: this.applicationData.preferredLanguage,
        otherPhoneNumber: this.applicationData.otherPhoneNumber,
        eventId: this.applicationData.eventId,
        apartmentUnit: this.applicationData.apartmentUnit,
        previousApartmentUnit: this.applicationData.previousApartmentUnit,
        previousCity: this.applicationData.previousCity,
      };

      this.apiService.saveApplicationData(dataToPost);
      this.submitLoad = false;
      this.router.navigateByUrl('contactinfo');
    } else {
      this.submitLoad = false;
      this.notificationsService.showError('Please check your fields and try again', '');
    }
  }

  get email() {
    return this.customerPersonalAdditionalDataForm.get('email');
  }

  get confirmedEmailAddress() {
    return this.customerPersonalAdditionalDataForm.get('confirmedEmailAddress');
  }

  get phoneNumber() {
    return this.customerPersonalAdditionalDataForm.get('phoneNumber');
  }

  get maritalStatus() {
    return this.customerPersonalAdditionalDataForm.get('maritalStatus');
  }

  get educationLevel() {
    return this.customerPersonalAdditionalDataForm.get('educationLevel');
  }

}
