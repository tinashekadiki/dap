import { ApplicationData } from 'src/app/data/models/formdata.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  applicationData: ApplicationData;
  constructor(private router: Router, private apiService: ApiService) {
    this.applicationData = this.apiService.retrieveApplicationData();
    console.log(this.applicationData);

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.applicationData != null) {
      return true;
    }
    this.router.navigateByUrl('aready-submitted');
    return false;
  }
}
