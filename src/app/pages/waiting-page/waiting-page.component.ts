import { Link } from './../../data/models/formdata.model';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { CustomerInteractionInitialData } from 'src/app/data/models/formdata.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.css']
})
export class WaitingPageComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private notificationsService: AlertService) { }
  view = false;
  text = "Waiting for co-applicant to complete the application";
  loading = false
  countDown: Subscription;
  counter: any;
  mintesToExpire: any;
  tick = 1000;
  linkData: Link;

  ngOnInit(): void {
    this.linkData = JSON.parse(sessionStorage.getItem('link'))

    this.formatDate(this.linkData.validUntil);
    this.setMinutesToExpire();
    setInterval(() => {
      this.refresh(this.linkData.uniqueId)
      console.log('logged');
      this.setMinutesToExpire();
    }, 120000);
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
  }

  setTimeOut() {
    setInterval(() => {
      this.refresh(this.linkData.uniqueId);
    }, 5000);
  }

  setMinutesToExpire() {
    this.mintesToExpire = Math.round(this.counter / 60);
  }


  formatDate(validUntil: string): void {

    let parsedDate = new Date(validUntil);

    let myMoment: moment.Moment = moment(parsedDate);
    let now: moment.Moment = moment(new Date());

    var duration = moment.duration(now.diff(myMoment));
    var minutesM = duration.asMinutes() * -1;
    var minutesDiff = Math.round(minutesM)
    if (minutesDiff > 0) {
      this.counter = minutesDiff * 60;
    }
  }

  refresh(uniqueId: string) {
    if (this.linkData.linkType == "dual") {
      this.apiService.previewAppication(uniqueId).subscribe((data: any) => {
        console.log(data);
        if (data.body.openLink) {
          if (data.body.response.previewApplication) {
            this.view = true;
            this.text = 'Co-applicant has completed the application you can review';
            location.href = '/redirect'
          } else {
            this.view = false;
          }
        } else {
          this.router.navigateByUrl('link-invalid');
        }
      }, error => {
        console.warn(error)
      });
    } else {
      this.router.navigate(['reviewinfo']);
    }
  }

  proceedAsSoleApplicatnt() {
    // this.apiService.postDeleteCoBorrower(this.customerInteractionInitialData.application.id).subscribe(data => {
    // }, error => {
    //   console.warn(error);
    // })
    this.apiService.proceedAsSoleApplicant(this.linkData.uniqueId).subscribe(data => {
      location.href = "/reviewinfo"
    }, error => {
      console.warn(error);
    })
  }
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
