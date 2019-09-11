import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authFeatureKey, AUTH_CONFIGURATION, AuthConfiguration, } from './auth.config';
import { AuthGuard } from './guards';
import { AuthService } from './services';
import { AuthInterceptor } from './interceptors';
import { authReducer } from './reducers';
import { AuthEffects } from './effects';

import { AuthRoutingModule } from './auth-routing.module';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { CONTAINERS } from './containers';

const MAT_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatProgressBarModule
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MAT_MODULES,
    FlexLayoutModule,

    AuthRoutingModule
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  entryComponents: [
    ENTRY_COMPONENTS
  ]
})
export class AuthModule {
  static forRoot(config?: AuthConfiguration): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIGURATION,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthService,
        AuthGuard
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import only in AppModule!');
    }
  }

}
