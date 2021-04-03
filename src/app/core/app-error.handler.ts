/**
 * 3rd Party Packages
 */
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Local imports
 */
import { ErrorService } from '@core/services/error.service';
import { environment } from '@env/environment';
/**
 * Extends angular ErrorHandler class functionality with logging and error message
 */
@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}
  /**
   * Inherit handleError from ErrorHandler class of angular
   *
   * @param error
   */
  handleError(error: Error | HttpErrorResponse): void {
    const errorService = this.injector.get(ErrorService);

    let message;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
    } else {
      // Client error
      message = errorService.getClientErrorMessage(error);
    }
    // Always log errors
    if (environment.production) {
      console.log(message);
    } else {
      console.log(message);
      console.log(error);
    }
  }
}
