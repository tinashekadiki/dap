import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormatDataService } from '../../services/format-data/format-data.service';
import { AlertService } from '../../services/alerts/alert.service';
import { ApplicationData, Link, Dealership, Disclourses } from 'src/app/data/models/formdata.model';
import { environment } from 'src/environments/environment';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-finaldisclosure',
  templateUrl: './finaldisclosure.component.html',
  styleUrls: ['./finaldisclosure.component.css']
})
export class FinaldisclosureComponent implements OnInit {
  error = "";
  checkBox = false;
  dealershipData: Dealership;
  applicationData: ApplicationData;
  linkData: Link
  submitLoad = false;
  disclosures: string[];
  consentData = {
    ipAddress: ""
  };
  diclosures: Disclourses = {
    electronic: true,
    credit: false,
    application: false,
    privacy: false,
  };
  deviceInfo: any

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formatDataService: FormatDataService,
    private notificationsService: AlertService,
    private deviceService: DeviceDetectorService,
    location: PlatformLocation
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    location.onPopState(() => {
      window.location.reload();
    });
  }
  ngOnInit(): void {
    this.disclosures = environment.diclosures;
    this.getIP();
    this.applicationData = this.apiService.retrieveApplicationData();
    this.diclosures.electronic = true;
    this.linkData = JSON.parse(sessionStorage.getItem('link'));
    this.dealershipData = JSON.parse(sessionStorage.getItem('Dealership'))
    this.dealershipData.phone = this.formatDataService.formatPhoneNumber(this.dealershipData.phone)
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  getIP() {
    this.apiService.getIPAddress().subscribe((res: any) => {
      this.consentData.ipAddress = res.ip;
    })
  }


  changeDiclosures(disclosure: string) {
    if (disclosure == 'credit') {
      this.diclosures.credit = true;
      this.diclosures.electronic = false;
      this.diclosures.application = false;
      this.diclosures.privacy = false;
      this.scrollTop()
    } else if (disclosure == 'electronic') {
      this.diclosures.credit = false;
      this.diclosures.electronic = true;
      this.diclosures.application = false;
      this.diclosures.privacy = false;
      this.scrollTop()
    } else if (disclosure == 'application') {
      this.diclosures.credit = false;
      this.diclosures.electronic = false;
      this.diclosures.application = true;
      this.diclosures.privacy = false;
      this.scrollTop()
    } else if (disclosure == 'privacy') {
      this.diclosures.credit = false;
      this.diclosures.electronic = false;
      this.diclosures.application = false;
      this.diclosures.privacy = true;
      this.scrollTop()
    } else {
      this.submitDiscosures()
    }
  }


  saveApplication() {
    this.submitLoad = true;
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
      "apartmentUnit": this.applicationData.apartmentUnit,
      "previousApartmentUnit": this.applicationData.previousApartmentUnit,
      "address": this.applicationData.address,
      "city": this.applicationData.city,
      "state": this.applicationData.state,
      "zip": this.applicationData.zip,
      "employmentStatus": this.applicationData.employmentStatus,
      "employerName": this.applicationData.employerName,
      "jobTitle": this.applicationData.jobTitle,
      "workPhoneNumber": this.applicationData.workPhoneNumber,
      "annualIncome": this.applicationData.annualIncome,
      "startDate": this.applicationData.startDate,
      "additionalIncome": this.applicationData.additionalIncome,
      "additionalIncomeSource": this.applicationData.additionalIncomeSource,
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
      "reposessionDate": this.applicationData.reposessionDate,
      "bankruptcyDate": this.applicationData.bankruptcyDate
    }
    this.apiService.saveApplication(this.linkData.uniqueId, dataToPost).subscribe((response: any) => {
      this.submitLoad = false;
      if (response.body.openLink) {
        this.router.navigate(['finalpage']);
      } else {
        this.router.navigateByUrl('link-invalid');
      }
    }, error => {
      console.warn(error);
      this.submitLoad = false;
      this.notificationsService.showError('Failed to save application try again', '');
    })
  }

  submitDiscosures() {
    this.submitLoad = true;
    this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('Credit Inquiry Disclosure')).subscribe(data => {
      this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('Electronic Record Disclosure')).subscribe(data => {
        this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('California Privacy Act Disclosure')).subscribe(data => {
          this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('Website Terms and Conditions Disclosure')).subscribe(data => {
            this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('Drivers License Scan Disclosure')).subscribe(data => {
              this.apiService.postDisclosure(this.linkData.uniqueId, this.getDisclosurePayload('State Application Disclosure')).subscribe(data => {
                this.saveApplication();
              }, error => {
                console.warn(error);
                this.notificationsService.showError('Failed to submit application please try again', '');
              })
            }, error => {
              console.warn(error);
              this.notificationsService.showError('Failed to submit application please try again', '');
            })
          }, error => {
            console.warn(error);
            this.notificationsService.showError('Failed to submit application please try again', '');
          })
        }, error => {
          console.warn(error);
          this.notificationsService.showError('Failed to submit application please try again', '');
        })
      }, error => {
        console.warn(error);
        this.notificationsService.showError('Failed to submit application please try again', '');
      })
    }, error => {
      console.warn(error);
      this.notificationsService.showError('Failed to submit application please try again', '');
    })
  }

  getDisclosurePayload(disclosure) {
    return {
      "globalCustomerId": this.linkData.globalCustomerId,
      "deviceMacAddress": this.deviceInfo?.mac ?? 'unknown',
      "deviceNetworkAddress": this.consentData.ipAddress,
      "disclosure": disclosure,
      "browser": this.deviceInfo.browser,
      "operatingSystem": `${this.deviceInfo.os}${this.deviceInfo.os_version}`,
      "forLink": this.linkData.uniqueId
    }
  }
}

