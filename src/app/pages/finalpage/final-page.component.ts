import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ApplicationData } from 'src/app/data/models/formdata.model';
import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalpage',
  templateUrl: './finalpage.component.html',
  styleUrls: ['./finalpage.component.css']
})
export class FinalPageComponent implements OnInit {
  applicationData:ApplicationData
  documentData:any;
  loading = true
  constructor(location: PlatformLocation, private apiService:ApiService, private nortificationService:AlertService) {
    location.onPopState(() => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.applicationData = this.apiService.retrieveApplicationData();
    // sessionStorage.clear();
    this.getLinkDetails(this.applicationData.applicationId)
  }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.documentData.response);
    link.setAttribute('download', `application`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    sessionStorage.clear();
}

  getLinkDetails(appUid:string){
    this.apiService.getApplicationDocument(appUid).subscribe((data: any)=> {
      console.log(data);
      this.documentData = data.body
      this.loading = false;
    }, error=> {
     this.loading = true;
     this.nortificationService.showError('Failed to load digital application documment', 'Failed to load digital application documment')
    })
  }
}

