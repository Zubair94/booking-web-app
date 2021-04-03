/**
 * 3rd Party Imports
 */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Service to parse Client and Server Errors
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }
  /**
   * Parses client error message from Typescript error interface
   *
   * @param error
   *
   * @return an error message as string
   */
  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }
  /**
   * Parses server error message from angular HttpErrorResponse interface
   *
   * @param error
   *
   * @return an error message as string
   */
  getServerErrorMessage(error: HttpErrorResponse): string {
    if (navigator.onLine && error.error) {
      return error.error.detail;
    } else {
      return 'No Internet Connection';
    }
  }
}
