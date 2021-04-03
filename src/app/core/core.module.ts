import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NavigationActionTiming, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';
import { CORE_REDUCERS, metaReducers } from '@store/core.reducer';
import { CustomSerializer } from '@store/router/custom-serializer';
import { AppErrorHandler } from '@core/app-error.handler';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(CORE_REDUCERS, { metaReducers, runtimeChecks:
        { strictActionImmutability: true, strictStateImmutability: true,
          strictStateSerializability: true, strictActionSerializability: true,
          strictActionTypeUniqueness: true, strictActionWithinNgZone: true } }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PreActivation,
      routerState: RouterState.Full
    }),
    EffectsModule.forRoot([]),
    SharedModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }) : []
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: AppErrorHandler
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
