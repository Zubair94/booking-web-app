import { Action } from '@ngrx/store';
import { Injector } from '@angular/core';

import { environment } from '@env/environment';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '@core/services/error.service';

export class EffectsHelper {

  constructor(private injectable: Injector) {}

  protected handleError(action: Action): MonoTypeOperatorFunction<Action> {
    const errorService = this.injectable.get(ErrorService);
    return catchError((error: any): Observable<Action> => {
      const message = errorService.getServerErrorMessage(error);
      // Always log errors
      if (environment.production) {
        console.log(message);
      } else {
        console.log(message);
        console.log(error);
      }
      return of(action);
    });
  }
}
