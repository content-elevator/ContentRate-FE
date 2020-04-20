import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class UtilService {
  constructor(private toastrService: ToastrService) {
  }

  createToastrSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      extendedTimeOut: 3500
    });
  }

  createToastrError(message: string, title: string) {
    this.toastrService.error(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      extendedTimeOut: 3500
    });
  }
}
