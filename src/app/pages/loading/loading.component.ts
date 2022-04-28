import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {


  PayPhoneInitialData: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.PayPhoneInitialData = JSON.parse(sessionStorage.getItem('PayPhoneInitialData') || '{}');
    if (this.PayPhoneInitialData.response.Response.RedirectTargetUrl) {
      this.redirect(this.PayPhoneInitialData.response.Response.RedirectTargetUrl)
    } else {
      this.redirect(this.PayPhoneInitialData.response.Response.AuthenticationUrl)
    }
  }
  redirect(RedirectTargetUrl: string) {
    location.href = RedirectTargetUrl
  }
}
