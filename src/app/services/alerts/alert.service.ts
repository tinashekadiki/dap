import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toaster: ToastrService) { }

  showSuccess(messageHeader: string, message: string) {
    this.clear();
    return this.toaster.success(message, messageHeader);
  }

  showError(messageHeader, message) {
    this.clear();
    return this.toaster.error(message, messageHeader);
  }

  clear() {
    this.toaster.clear();
  }
}
