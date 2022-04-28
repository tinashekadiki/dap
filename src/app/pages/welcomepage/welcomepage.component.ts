import {browser, element} from 'protractor';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from 'src/app/services/api/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'src/app/services/alerts/alert.service';
import {
  ApplicationData,
  CustomerData,
  CustomerInteractionInitialData,
  CustomerPersonalData,
  Dealership
} from 'src/app/data/models/formdata.model';
import {XmlJsonProcessorService} from 'src/app/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  loading = true;
  personalData: CustomerPersonalData;
  customerInteractionInitialData: CustomerInteractionInitialData;
  initialData: any;
  customerData: CustomerData;
  dealershipData: Dealership;
  generalSettings: any;
  imageData: any;

  constructor(
    private titleService: Title,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private xmLJson: XmlJsonProcessorService,
    private alertService: AlertService) {
    this.titleService.setTitle('Digital Application Form - Welcome');

  }

  ngOnInit(): void {
    sessionStorage.clear();
    const linkId = this.route.snapshot.paramMap.get('id');
    // this.checkLinkValid(linkId);
    this.getCustomerData(linkId)

    const applicationData: any = {
      applicationId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      birthday: '',
      ssn: '',
      driversLicenseNumber: '',
      eventId: '',
      email: '',
      confirmedEmailAddress: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      employmentStatus: '',
      employerName: '',
      jobTitle: '',
      workPhoneNumber: '',
      annualIncome: '',
      startDate: '',
      additionalIncome: '',
      additionalIncomeSource: '',
      bankruptcy: '',
      reposession: '',
      lease: '',
      reposessionDate: '',
      bankruptcyDate: '',
      ownership: '',
      monthlyRent: '',
      monthlyMortgage: '',
      maritalStatus: '',
      numberOfDependents: '',
      educationLevel: '',
      previousZip: '',
      previousAddress: '',
      previousState: '',
      timeAtAddressYears: '',
      timeAtAddressMonths: '',
      timeAtPreviousAddressYears: '',
      timeAtPreviousAddressMonths: '',
      previousEmployerName: '',
      previousJobTitle: '',
      previousPhoneNumber: '',
      previousAnnualIncome: '',
      previousEmploymentStartDate: '',
      previousEmploymentEndDate: '',
      title: '',
      relationship: '',
      suffix: '',
      prefix: '',
      driversLicenceState: '',
      housingStatus: '',
      preferredContactMethod: '',
      preferredLanguage: '',
      otherPhoneNumber: ''
    };
    this.apiService.saveApplicationData(applicationData);
  }

  getCustomerData(uniqueId) {
    this.apiService.initialLise(uniqueId).subscribe((data: any) => {
        console.log(data);
        if (data.body.openLink) {
          this.customerData = data.body.response.profile.CustomerData;
          this.personalData = this.customerData.CustomerPersonalDetails;
          sessionStorage.setItem('customerData', JSON.stringify(this.customerData));
          sessionStorage.setItem('link', JSON.stringify(data.body.response.link));
          this.dealershipData = data.body.response.dealerSetting.branch;
          sessionStorage.setItem('Dealership', JSON.stringify(this.dealershipData));
          this.generalSettings = this.xmLJson.xmlToJson(data.body.response.dealerSetting.settingsToken);
          this.imageData = {
            fileDownloadUri: this.generalSettings.settings.dealerimage
          };
          sessionStorage.setItem('privacyLink', this.generalSettings.settings.privacyLink);
          sessionStorage.setItem('additionalIncomeSources', JSON.stringify(data.body.response.additionalIncomeSources))
          sessionStorage.setItem('housingStatuses', JSON.stringify(data.body.response.housingStatuses))
          sessionStorage.setItem('educationLevels', JSON.stringify(data.body.response.educationLevels))
          sessionStorage.setItem('maritalStatuses', JSON.stringify(data.body.response.maritalStatuses))
          sessionStorage.setItem('employementStatuses', JSON.stringify(data.body.response.employementStatuses))
          this.loading = false;
        } else {
          this.router.navigateByUrl('link-invalid');
        }
      },
      error => {
        this.alertService.showError('Failed to load customer data', ' ');
      });
  }
}
