import {CustomerBiometricData, Dealership, Link} from './../../data/models/formdata.model';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from 'src/app/services/api/api.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AlertService} from 'src/app/services/alerts/alert.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormatDataService} from 'src/app/services/format-data/format-data.service';
import {CustomerContactData, CustomerData, CustomerPersonalData} from 'src/app/data/models/formdata.model';
import {environment} from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-disclourses',
  templateUrl: './disclourses.component.html',
  styleUrls: ['./disclourses.component.css']
})
export class DiscloursesComponent implements OnInit {

  loading = false;
  loadingIp = true;
  error = '';
  applicationType: any;
  customerData: CustomerData;
  personalData: CustomerPersonalData;
  contactData: CustomerContactData;
  biometricData: CustomerBiometricData;
  ipAddress: string;
  ipV6Address: string;
  privacyLink: any;
  sprivacyLink: any;
  link: Link;
  isDealerInCalifornia = false;
  isCustomerInCalifornia = false;
  dealerShip: Dealership;
  webTermsError = '';
  disclosureError = '';

  disclosureForm = new FormGroup({
    applicationType: new FormControl(''),
    policy: new FormControl(false),
    disclosure: new FormControl(false),
    phoneNumber: new FormControl(''),
    lastFour: new FormControl(''),
    dob: new FormControl('')
  });


  constructor(private router: Router,
              private apiService: ApiService,
              private deviceService: DeviceDetectorService,
              private notificationsService: AlertService,
              private formBuilder: FormBuilder,
              private formatDataService: FormatDataService,
              private sanitizer: DomSanitizer
  ) {
  }


  ngOnInit(): void {
    this.getIP();
    this.privacyLink = sessionStorage.getItem('privacyLink')
    this.sprivacyLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.privacyLink);
    this.link = JSON.parse(sessionStorage.getItem('link'))

    this.link.linkType === 'dual' ? this.onApplicationTypeChange('dual') : this.onApplicationTypeChange('single')
    // this.getCustomerRecordsPersonalData(this.InitialData.link.globalCustomerId, this.InitialData.link.token)
    this.customerData = JSON.parse(sessionStorage.getItem('customerData'));
    this.dealerShip = JSON.parse(sessionStorage.getItem('Dealership'));
    this.personalData = this.customerData.CustomerPersonalDetails;
    this.contactData = this.customerData.CustomerContactDetails;
    this.personalData.dateOfBirth = this.formatDataService.dateFormat(this.personalData.dateOfBirth);
    this.biometricData = this.customerData.CustomerBiometricDetail;
    console.log(this.biometricData.correctDateOfBirth);

    this.biometricData.correctDateOfBirth = this.formatDataService.dateFormatFromBiometrics(this.biometricData.correctDateOfBirth)

    console.log(this.biometricData.correctDateOfBirth);
    console.log(this.personalData.dateOfBirth);

    this.disclosureForm.patchValue({
      phoneNumber: this.contactData.cellPhone,
      dob: this.biometricData.correctDateOfBirth.substr(0, 5),
      lastFour: this.personalData.socialSecurityNumber.substr(9, 13)
    });

    const carliforniaStates = ['california', 'ca'];
    this.isDealerInCalifornia = this.dealerShip !== null && carliforniaStates.includes(this.dealerShip.state.toLowerCase());
    this.isCustomerInCalifornia = carliforniaStates.includes(this.customerData.CustomerContactDetails.state.toLowerCase());
  }

  onApplicationTypeChange(type: string): void {
    this.applicationType = type;
  }

  privacyLocation(link) {
    window.location.href = link;
  }

  getIP() {
    this.loadingIp = true;
    this.apiService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.getIpV6();
    }, error => {
      this.loadingIp = false;
    });

  }

  getIpV6() {
    this.apiService.getIPv6Address().subscribe((res: any) => {
      this.ipV6Address = res.ip;
      this.loadingIp = false;
    }, error => {
      this.loadingIp = false;
    });
  }


  submitForm(): void {
    // !this.disclosureForm.value.policy || !this.disclosureForm.value.disclosure ?
    // this.notificationsService.showError("Please agree and continue", '') : this.postMobileAuth(this.link.uniqueId);
    if (this.disclosureForm.value.policy !== true){
      this.webTermsError = 'Please click acknowledge to continue';
    }
    else if ((this.isDealerInCalifornia || this.isCustomerInCalifornia) && this.disclosureForm.value.disclosure !== true){
      this.disclosureError = 'Please click acknowledge to continue';
    }
    else {
      this.postMobileAuth(this.link.uniqueId);
    }
  }

  postMobileAuth(uniqueId) {
    this.loading = true;
    if (!this.disclosureForm.value.phoneNumber) {
      this.router.navigateByUrl('error-page');
    } else {
      const dataToPost = JSON.stringify({
        sessionId: this.apiService.getSessionId(),
        customerIp: this.ipAddress,
        customerIp6: this.ipV6Address,
        targetUrl: `${environment.AppUrl}personalinfo`,
        phoneNumber: this.disclosureForm.value.phoneNumber,
        lastFour: this.disclosureForm.value.lastFour,
        dob: this.disclosureForm.value.dob,
        form: "digitalapp"
      });

      // {
      //   "sessionId":"5648ryuyt",
      //   "customerIp":"2600:100c:b220:d339:1578:85c5:6269:51e5",
      //   "customerIp6":"174.197.66.151",
      //   "phoneNumber":"2162557559",
      //   "lastFour":"6327",
      //   "dob":"01/31",
      //   "targetUrl":"https://digitalapp.qubedlab.com/",
      //   "form":"digitalauth"
      //   }
      this.apiService.mobileAuth(uniqueId, dataToPost).subscribe((data: any) => {
        this.loading = false
        console.log(data);
        sessionStorage.setItem('PayPhoneInitialData', JSON.stringify(data.body));
        if (data.body.response.Status === 0 || data.body.response.Status === '0') {
          sessionStorage.setItem('verification', JSON.stringify(true))
          if (data.body.response.Response.RedirectTargetUrl) {
            this.router.navigateByUrl('loading');
          } else if (data.body.response.Response.AuthenticationUrl) {
            this.router.navigateByUrl('loading');
          }
        } else {
          sessionStorage.setItem('verification', JSON.stringify(false))
          this.router.navigateByUrl('personalinfo');
        }
      }, error => {
        this.loading = false
        console.warn(error);
        this.notificationsService.showError("Something went wrong in mobile auth try again", '');
        this.router.navigateByUrl('error-page');
      })
    }
  }
}
