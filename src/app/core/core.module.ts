import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { environment } from '@app/env';
import { reducers, metaReducers } from './store';
import { CustomRouterStateSerializer } from './router';

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      name: 'goodjob-app\-app'
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }

  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
