import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApplicationData, GeneralSetting, Individual } from 'src/app/data/models/formdata.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ipAddressLink = environment.ipAddressLink;


  constructor(private http: HttpClient) { }

  getSessionId() {
    return environment.sessionId;
  }

  initialLise(uniqueId) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getInitialiseTag}`, {},)
  }

  mobileAuth(uniqueId, payload) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getMobileAuthTag}`, payload);
  }


  mobileAuthVerificationFinish(uniqueId, payload) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getmobileAuthVerificationFinishTag}`, payload);
  }

  saveApplication(uniqueId, payload) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getSaveApplicationTag}`, payload);
  }


  applicationComplete(uniqueId, payload) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getCompleteApplicationTag}`, payload);
  }
  previewAppication(uniqueId) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getPreviewAppicationTag}`, {});
  }

  postDisclosure(uniqueId, payload) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getSendDisclosureTag}`, payload);
  }

  retrieveApplicationCo(payload, uniqueId) {
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getRetrieveApplicationTag}`, payload)
  }
  proceedAsSoleApplicant(uniqueId) {
    return this.http.get(`${environment.baseUrlDomain}${uniqueId}/${environment.getProceedAsSoleApplicantTag}`)
  }





  public getIPAddress() {
    return this.http.get(environment.ipAddressLink);
  }
  public getIPv6Address() {
    return this.http.get(environment.ipv6AdrressLink);
  }



  saveApplicationData(data: any): boolean {
    sessionStorage.setItem('ApplicationData', JSON.stringify(data));
    return true;
  }

  retrieveApplicationData(): ApplicationData {
    var applicationData: ApplicationData = JSON.parse(sessionStorage.getItem('ApplicationData'))
    return applicationData
  }

  getApplicationDocument(uniqueId:string){
    return this.http.post(`${environment.baseUrlDomain}${uniqueId}/${environment.getDocumentTag}`, {})
  }

  setPayphoneIndividual(data:any){
    sessionStorage.setItem('payPhoneIndividualData',JSON.stringify(data) )
  }

  retrievePayphoneIndiviualData() : Individual{
    var payPhoneIndividualData : Individual = JSON.parse(sessionStorage.getItem('payPhoneIndividualData'));
    return payPhoneIndividualData;
  }

}
